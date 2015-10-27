var props = require('./addToProperties')

addApiKey();

/**
 * Adds Forecast.io API key to properties.json file
 */
function addApiKey() {
    if (process.argv[2]) props.addProp('forecast_io_api_key', process.argv[2]);
    else console.log("Error: Invalid input.");
}
