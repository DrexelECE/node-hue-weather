var props = require('./properties.json');
var http = require('http');

var hueIp = props['philips_hue_bridge_ip'];
var username = 'nodeHueWeather';

var oldStates = {};
var state1;
var state2;

/**
 * Controls hue lights to the first hue state, then the second, then the
 * previous light state
 *
 * @param hue1 The first hue value (0-0xFFFF)
 * @param hue2 The second hue value (0-0xFFFF)
 */
module.exports = function(error, hue1, hue2) {
    if (error) throw error;

    state1 = buildHueState(hue1, 254, 100);
    state2 = buildHueState(hue2, 254, 100);

    getAllLightStates();
}

/**
 * Runs the light control sequence
 */
function runLightSequence() {
    setGroupState(0, state1);
    setTimeout(function() {setGroupState(0, state2)}, 1000);
    setTimeout(function() {returnToOriginalState()}, 2000);
}

/**
 * Gets the current state for all lights
 */
function getAllLightStates() {
    var url = "/api/" + username + "/lights";

    var req = http.request({
        hostname: hueIp,
        path: url
    }, function(res) {
        res.setEncoding('utf8');
        res.on('data', parseData)
    });

    req.on('error', function (error) {
      console.log('Problem with request: ' + error);
    });
    req.end(runLightSequence);
}

/**
 * Parses the data for each light
 *
 * @param data The response from the get request
 */
function parseData(data) {
    if (data.indexOf('state') > -1) {
        // If this is a state
        console.log(data)

        // RegEx for num only
        var numOnly = /^\d+$/;

        var id;

        // Get the on state
        var on = true;
        var i = data.indexOf('on');
        if (data.substring(i+4, i+5) === 'f') {
            on = false;
        }

        // Get the brightness
        i = data.indexOf('bri');
        var bri = data.substring(i+5, i+8);
        var num = numOnly.exec(bri);
        if (num) bri = num[0];

        console.log("on: " + on + " bri: " + bri);

        if (data.indexOf('hue') > -1) {
            // If this is a color bulb

            // Get the hue
            i = data.indexOf('hue');
            var hue = data.substring(i+5, i+8);
            var num = numOnly.exec(hue);
            if (num) hue = num[0];

            // Get the saturation
            i = data.indexOf('sat');
            var sat = data.substring(i+5, i+8);
            var num = numOnly.exec(sat);
            if (num) sat = num[0];

            // Get the xy vals
            i = data.indexOf('xy');
            var xy = data.substring(i+4, i+19);

            // Get the ct
            i = data.indexOf('\"ct\"');
            var ct = data.substring(i+5, i+8);
            var num = numOnly.exec(ct);
            if (num) ct = num[0];

            // Get the color mode
            var colormode;

            console.log('hue: ' + hue + ' sat: ' + sat + ' xy: ' + xy +
              ' ct: ' + ct);

        } else {

        }
    }
}

/**
 * Sets the valid light state for a specified group
 *
 * @param group the group number
 * @param state the light state to set
 *
 * @callback the response from the bridge
 */
function setGroupState(group, state, callback) {
    var url = "/api/" + username + "/groups/" + group + "/action";

    var req = http.request({
        method: 'PUT',
        hostname: hueIp,
        path: url
    }, callback);

    req.write(state);
    req.on('error', function (error) {
      console.log('Problem with request: ' + error);
    });
    req.end();
}

/**
 * Builds a state with a specified hue and brightness
 *
 * @param hue the hue to set to (0-0xFFFF)
 * @param bri the brightness to set to (0-254)
 * @param trans the transition time in ms
 *
 * @callback The light state in JSON format
 */
function buildHueState(hue, bri, trans) {
    return JSON.stringify({
      on: true,
      bri: bri,
      hue: hue,
      sat: 254,
      transitiontime: trans/100
    })
}

/**
 * Returns the lights to their original state
 */
function returnToOriginalState() {
    console.log('Return to original state');
}
