/**
 * Generates random temperature and precipitation values for testing purposes
 *
 * @param location (ignored)
 *
 * @callback The temperature in Fahrenheit and the precipitation percentage
 */
module.exports = function (location, callback) {

  // random integer values between 0 and 100
  var tempFahrenheit = Math.round(Math.random() * 100);
  var precipPercent = Math.round(Math.random() * 100);

  var cal = new Date();
  var date = cal.toDateString();
  var time = cal.toLocaleTimeString();

  console.log("Today's forecast: Temperature: " + tempFahrenheit +
      " F, Precipitation: " + precipPercent + "%. Retrieved " +
      date + ' ' + time + '.');

  callback(null, tempFahrenheit, precipPercent);
}
