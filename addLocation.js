var props = require('./addToProperties');

addLocation();

/**
 * Adds location specified by lat,long to properties.json file
 */
function addLocation() {
    if (process.argv[3]) { // make sure we have three arguments and that they're numeric.
        props.addProp('location', {lat: parseFloat(process.argv[2]), lng: parseFloat(process.argv[3])});
    }
    else console.log("Error: Invalid input.");
}
