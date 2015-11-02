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
        // If this is a state report

        // RegEx for numbers only
        var numOnly = /\d+/g;

        // For storing the state
        var state = {};

        // Get the id
        var i = data.indexOf('state');
        var id = data.substring(i-6, i-4);
        var num = id.match(numOnly);
        if (num) id = num[0];

        // Get the on/off state
        var on = true;
        i = data.indexOf('on');
        if (data.substring(i+4, i+5) === 'f') {
            on = false;
        }
        state["on"] = on;

        if (on) {

          // Get the brightness
          i = data.indexOf('bri');
          var bri = data.substring(i+5, i+8);
          var num = bri.match(numOnly);
          if (num) bri = num[0];
          state["bri"] = parseInt(bri);

          if (data.indexOf('hue') > -1) {
              // If this is a color bulb

              // Get the color mode
              i = data.indexOf('colormode');
              var colormode = data.substring(i+12, i+14);

              if (colormode === 'xy') {

                  // Get the xy vals
                  i = data.indexOf('xy');
                  var xy = data.substring(i+4, i+19);
                  var num = xy.match(numOnly);
                  if (num) xy = [parseInt(num[0]), parseInt(num[1])];
                  state["xy"] = xy;

              } else if (colormode === 'hs') {

                  // Get the hue
                  i = data.indexOf('hue');
                  var hue = data.substring(i+5, i+8);
                  var num = hue.match(numOnly);
                  if (num) hue = num[0];
                  state["hue"] = parseInt(hue);

                  // Get the saturation
                  i = data.indexOf('sat');
                  var sat = data.substring(i+5, i+8);
                  var num = sat.match(numOnly);
                  if (num) sat = num[0];
                  state["sat"] = parseInt(sat);

              } else if (colormode == 'ct') {

                  // Get the ct
                  i = data.indexOf('\"ct\"');
                  var ct = data.substring(i+5, i+8);
                  var num = ct.match(numOnly);
                  if (num) ct = num[0];
                  state["ct"] = parseInt(ct);

              } else console.error("Could not get the color mode for id: " + id);
        }
      }

      // Add the state to the oldStates array
      if (id) oldStates[id] = state;

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
    putDataRequest(url, state, callback);
}

/**
 * Sets the valid light state for a light
 *
 * @param if the light id
 * @param state the light state to set
 *
 * @callback the response from the bridge
 */
function setLightState(id, state, callback) {
    var url = "/api/" + username + "/lights/" + id + "/state";
    putDataRequest(url, state, callback);
}

/**
 * Send a put request
 *
 * @param url the path
 * @param body the request body
 *
 * @callback the result
 */
function putDataRequest(url, body, callback) {
    var req = http.request({
        method: 'PUT',
        hostname: hueIp,
        path: url
    }, callback);

    req.write(body);
    req.on('error', function (error) {
      console.log('Problem with request: ' + error);
      callback(error);
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
 * Returns the lights to their original states
 */
function returnToOriginalState() {
    // Run 2x
    setToOriginalState();
    setTimeout(function() {
        setToOriginalState()
    }, Object.keys(oldStates).length*100 + 100);
}

/**
 * Sets the lights to their original states
 */
function setToOriginalState() {
    Object.keys(oldStates).forEach(function(id, index) {
        setTimeout(function() {
            // Need to slow down calls to the bridge
            setLightState(id, JSON.stringify(oldStates[id]), function(res) {});
        }, index*100)
    });
}
