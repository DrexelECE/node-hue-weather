var props = require('./properties.json');
var http = require('http');

var hueIp = props['philips_hue_bridge_ip'];
var username = 'nodeHueWeather';

var oldStates = {};

/**
 * Controls hue lights to the first hue state, then the second, then the
 * previous light state
 *
 * @param hue1 The first hue value (0-0xFFFF)
 * @param hue2 The second hue value (0-0xFFFF)
 */
module.exports = function(error, hue1, hue2) {
    if (error) throw error;

    var state1 = buildHueState(hue1, 254, 100);
    var state2 = buildHueState(hue2, 254, 100);

    setGroupState(0, state1);
    setTimeout(function() {setGroupState(0, state2)}, 2000);
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
    console.log('setting group state: ' + state);

    var url = "/api/" + username + "/groups/" + group + "/action";

    var req = http.request({
        method: 'PUT',
        hostname: hueIp,
        path: url,
    }, callback);

    req.write(state);
    req.on('error', function (error) {
      console.log('problem with request' + error);
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
