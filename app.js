var weather;
var color = require('./color');
var fs = require('fs');

var location = 0; // TODO

getWeatherForecast();

/**
 * Gets info from the properties file
 */
function readPropertiesfile() {
  // TODO
}

/**
 * Gets the weather forecast for the current location
 */
function getWeatherForecast() {
  if (process.argv[2] == "-test") {
    console.log("Running in test mode!");
    weather = require('./testWeather');
    weather(location, getColors);
  } else {
    weather = require('./weather');
    weather(location, getColors);
  };
}

/**
 * Gets the colors associated with the forecast
 */
function getColors(error, temp, precip) {
  if (error) throw error;
  color(temp, precip, controlHue);
}

function controlHue(error, tempRGB, precRGB) {
  if (error) throw error;
  console.log("Temp RGB: " + tempRGB);
  console.log("Prec RGB: " + precRGB);

  // TODO control the lights
}
