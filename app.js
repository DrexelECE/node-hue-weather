var weather;
var color = require('./color');
var controlHue = require('./controlHue');
var props = require('./properties.json');
var dash_button = require('node-dash-button');

var location = props['location'];
var apiKey = props['forecast_io_api_key'];
var hueIp = props['philips_hue_bridge_ip'];
var dashButtons = props['amazon_dash_button'];

var dash = dash_button(dashButtons);

var tHue = 0;
var pHue = 0;

getWeatherForecast(); // TODO James run this on a set interval like 4 h

/**
 * Gets the weather forecast for the current location
 */
function getWeatherForecast() {
    if (process.argv[2] == "-test") {
        console.log("Running in test mode!");
        weather = require('./testWeather');
    } else {
        weather = require('./weather');
    };

    weather(location, getColors, apiKey);
}

/**
 * Gets the colors associated with the forecast
 *
 * @param error If any error
 * @param temp Temp in Fahrenheit
 * @param precip % Precipitation
 */
function getColors(error, temp, precip) {
    if (error) throw error;
    color(temp, precip, function(err, res1, res2) {
        if (!err) {
            tHue = res1;
            pHue = res2;
        } else throw error;
    });
}

/**
 * Responds when a dash button is pressed
 */
dash.on("detected", function (dash_id){
   console.log('Dash Button ' + dash_id + ' detected.');
   controlHue(null, tHue, pHue);
});
