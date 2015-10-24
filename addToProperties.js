var filePath = './properties.json';
var json = require(filePath);
var fs = require('fs');

manual();

/**
 * Adds the selected property to the properties.json file
 *
 * @param key The key
 * @param value The value
 */
function addProp(key, value) {
  if (key == 'location' || key == 'forecast_io_api_key'
    || key == 'philips_hue_bridge_ip') {
      json[key] = value;
      writeJson();
      console.log("Success: Added \"" + key + "\":\"" + value + "\" to properties.json.");
  } else if (key == 'amazon_dash_button') {
      json[key].push(value);
      writeJson();
      console.log("Success: Added Dash Button MAC: " + value + " to properties.json.");
  } else {
      console.error("Error: Unrecognized key/value pair. Try again.");
  }
};

/**
 * Writes to the JSON file
 */
function writeJson() {
    fs.writeFile(filePath, JSON.stringify(json, null, '\t'));
}

/**
 * Allows for manual command line input
 */
function manual() {
  if (process.argv[2] && process.argv[3]) {
    addProp(process.argv[2], process.argv[3]);
  }
}

module.exports.addProp = addProp;
