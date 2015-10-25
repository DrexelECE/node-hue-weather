var hue = require("node-hue-api");
var props = require('./properties.json');
var async = require('async');

var HueApi = hue.HueApi;
var lightState = hue.lightState;
var hueIp = props['philips_hue_bridge_ip'];
var username = 'nodeHueWeather';
var api = new HueApi(hueIp, username);

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
            var oldStates = [];
            lightIds.forEach(function(id) {
                api.lightStatus(id, function(err, result) {
                    if (err) throw err;
                    else {
                      console.log(result);
                      oldStates.push(result['state']);
                    }
                });
            });
            callback(null, oldStates);
        },
        function(oldStates, hue1, hue2, callback) {
            var state1 = lightState.create().on().brightness(100).transition(0).hsb(hue1, 100, 100);
            var state2 = state1.copy().hsb(hue2, 100, 100);

            api.setGroupLightState(0, state1)
                .fail(console.log)
                .done();

            api.setGroupLightState(0, state2)
                .fail(console.log)
                .done();

            // api.setGroupLightState(0, oldState)
            //     .fail(displayError)
            //     .done();
        }
    ], function(err, res) {
        console.log(res)
    })
}
