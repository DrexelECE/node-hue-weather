#!/usr/bin/env node

process.env.NODE_ENV = 'test'
//simple module for finding your button's mac
// modified by GY

var int_array_to_hex = require('./node_modules/node-dash-button/index.js').int_array_to_hex;
var create_session = require('./node_modules/node-dash-button/index.js').create_session;
var pcap = require('./node_modules/node-dash-button/node_modules/pcap/pcap.js');

var pcap_session = create_session();

console.log("Watching for arp requests on your local network, please try to press your dash now");

pcap_session.on('packet', function(raw_packet) {
    var packet = pcap.decode.packet(raw_packet); //decodes the packet
    if(packet.payload.ethertype === 2054) { //ensures it is an arp packet
        possible_dash = packet.payload.payload.sender_ha.addr; //getting the hardware address of the possible dash
        possible_dash = int_array_to_hex(possible_dash);
        console.log("possible dash hardware address detected: ", possible_dash);
    }
});
