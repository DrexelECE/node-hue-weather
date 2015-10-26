var hue = require("node-hue-api");
var props = require('./properties.json');
var async = require('async');

var HueApi = hue.HueApi;
var lightState = hue.lightState;
var hueIp = props['philips_hue_bridge_ip'];
var username = 'nodeHueWeather';
var api = new HueApi(hueIp, username);

var oldStates = {};

/**
 * Controls hue lights to the first RGB state, then the second, then the
 * previous light state
 *
 * @param hue1 The first hue value (0-359)
 * @param hue2 The second hue value (0-359)
 */
module.exports = function(error, hue1, hue2) {
    if (error) throw error;

    async.waterfall([
        function(callback) {
            api.lights(function(err, lights) {
                if (err) throw err;
                callback(null, lights);
            })
        },
        function(lights, callback) {
            var lightIds = [];
            lights['lights'].forEach(function(light) {
                lightIds.push(parseInt(light['id']));
            });
            callback(null, lightIds);
        },
        function(lightIds, callback) {
            lightIds.forEach(function(id) {
                api.lightStatus(id, function(err, result) {
                    if (result) {
                        oldStates[id] = result['state'];
                    }
                });

            });
            callback(null);
        },
        function(callback) {

            var state1 = lightState.create().shortAlert().hsb(hue1, 100, 100);
            var state2 = lightState.create().shortAlert().hsb(hue2, 100, 100);

            ctrlAllLights(state1);
            //setTimeout(ctrlAllLights(state2), 5000);

            // api.setGroupLightState(0, oldState)
            //     .fail(displayError)
            //     .done();
        }
    ], function(err, res) {
        console.log(res)
    })
}

function ctrlAllLights(state) {
    console.log('ctrl')
    api.setGroupLightState(0, state)
        .fail(console.log)
        .done();
}

function ctrlLight(light, state) {
    console.log('ctrl')
    api.setLightState(light, state)
        .fail(console.log)
        .done();
}
