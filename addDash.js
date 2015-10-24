var props = require('./addToProperties')

addButton();

/**
 * Adds Amazon Dash Button MAC Address to properties.json file
 */
function addButton() {
    if (process.argv[2]) props.addProp('amazon_dash_button', process.argv[2]);
    else console.log("Error: Invalid input.");
};
