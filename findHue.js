var hue = require("node-hue-api");
var props = require("./addToProperties")

function addBridge (bridge) {
    var ip = bridge[0]["ipaddress"];

    props.addProp('philips_hue_bridge_ip', ip)

    console.log("Bridge with IP: " + ip + " added.");
};

hue.nupnpSearch().then(addBridge).done();
