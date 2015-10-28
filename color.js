/**
 * Returns RGB values for the temperature and precipitation
 *
 * @param temp The temperature in Fahrenheit
 * @param precip The chance of precipitation in % (meaning range of, 0.0 - 1.0)
 * @param callback The callback function.
 *
 * @callback The color values for the temperature and precipitation
 */
module.exports = function(temp, precip, callback) {

  if (isNaN(precip)) callback(new Error("precip is not numeric"), null, null);
  if (isNaN(temp)) callback(new Error("temp is not numeric"), null, null);

  var hueTemp = Math.floor(170 + (0.85 * temp)); // blue (0 degF) to red (100 degF), via magenta

  var huePrec = Math.floor(42 + (85 * precip)); // yellow (0%) to cyan (100%), via green

  callback(null, hueTemp, huePrec);
};
