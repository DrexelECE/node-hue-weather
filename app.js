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
  } else {
    weather = require('./weather');
  };

  weather(location, getColors);
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
  color(temp, precip, controlHue);
}

/**
 * Controls the hue lights
 *
 * @param error If any error
 * @param tempRGB RGB for temp
 * @param precRGB RGB for precip
 */
function controlHue(error, tempRGB, precRGB) {
  if (error) throw error;
  console.log("Temp RGB: " + tempRGB);
  console.log("Prec RGB: " + precRGB);

  // TODO control the lights
}
