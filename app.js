var weather,
    color = require('./color'),
    controlHue = require('./controlHue'),
    props = require('./properties.json'),
    dash_button = require('node-dash-button'),
    later = require('later');

var location = props['location'],
    apiKey = props['forecast_io_api_key'],
    hueIp = props['philips_hue_bridge_ip'],
    dashButtons = props['amazon_dash_button'];

var dash = dash_button(dashButtons);

var tHue = 0,
    pHue = 0;

var withinTimeout = false;

later.date.localTime();

getWeatherForecast();   // Get forecast at program start
var sched = later.parse.text('at 12:01 AM');  // Also once per day
later.setInterval(getWeatherForecast, sched);

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
    if (!withinTimeout) {
      console.log('Dash Button ' + dash_id + ' detected.');
      withinTimeout = true; // Block input to prevent extraneous arp reqs
      setTimeout(function() {
          // Unblock after 45 s
          withinTimeout = false
      }, 45000);
      controlHue(null, tHue, pHue);
    }
});
