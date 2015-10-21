

/**
 * Gets the temperature and chance of precipitation for today
 *
 * @param location The location (zip code or lat/long?)
 *
 * @callback The temperature in Fahrenheit and the precipitation percentage
 */
module.exports = function (location, callback) {

  // TODO James fill this in
  // location could either be a zip code (preferred) or an array
  // with lat/long - let me know what you come up with!

  var error = false;
  var tempFahrenheit = null;
  var precipPercent = null;

  if (error) {
    console.log("Error getting weather data");
    callback(error, null, null);
  }

  console.log("Temperature: " + tempFahrenheit +
    " F, Precipitation: " + precipPercent + "%." );

  callback(null, tempFahrenheit, precipPercent); // null for no error!
}
