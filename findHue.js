var hue = require("node-hue-api");
var props = require("./addToProperties")

var HueApi = hue.HueApi;
var username = 'nodeHueWeather';
var api;

function addBridge (bridge) {
    var ip = bridge[0]["ipaddress"];
    api = new HueApi(ip, username);
    api.config().then(displayResult).done();
    props.addProp('philips_hue_bridge_ip', ip);
    console.log("Bridge with IP: " + ip + " added.");
};

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};


hue.nupnpSearch().then(addBridge).done();
