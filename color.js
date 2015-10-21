/**
 * Returns RGB values for the temperature and precipitation
 *
 * @param temp The temperature in Fahrenheit
 * @param precip The chance of precipitation in %
 *
 * @callback The RGB values for the temperature and precipitation
 */
module.exports = function(temp, precip, callback) {
  var error = false;
  if (error) callback(error, null, null);

  // TODO James implement the logic for converting values to colors

  var tempRGB = [255,0,0];
  var precRGB = [0,255,0];

  callback(null, tempRGB, precRGB);
}
