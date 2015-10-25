var hue = require("node-hue-api");
var props = require("./addToProperties")

var HueApi = hue.HueApi;
var username = 'nodeHueWeather';
var userDesc = 'node hue weather'
var api;
var ip;

function addBridge (bridge) {
    ip = bridge[0]["ipaddress"];
    register();
    props.addProp('philips_hue_bridge_ip', ip);
    console.log("Bridge with IP: " + ip + " added.");
};

function register() {
    api = new HueApi();
    api.registerUser(ip, username, userDesc)
      .then(displayResult)
      .fail(displayError)
      .done();
}

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};



hue.nupnpSearch().then(addBridge).done();
