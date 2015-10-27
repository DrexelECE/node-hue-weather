/**
 * Gets the temperature and chance of precipitation for today
 *
 * @param location The location (lat/lng object from properties.json)
 * @param callback The callback function
 * @param apiKey The Forecast API key
 *
 * @callback The temperature in Fahrenheit and the precipitation percentage
 */
module.exports = function (location, callback, apiKey) {

    try {
        getJSON(
            {
                host: 'api.forecast.io',
                port: 443,
                path: '/forecast/' + apiKey + "/" + location.lat + "," + location.lng + "?exclude=currently,minutely,hourly,alerts,flags&units=us",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            function (statusCode, result) {
                if (statusCode != 200) {
                    console.log("Could not get data from Forecast API");
                    callback(new Error("Could not get data from Forecast API"), null, null);
                }

                var tempF = NaN,
                    precipPct = NaN;

                try {
                    tempF = result.daily.data[0].apparentTemperatureMax;
                    precipPct = result.daily.data[0].precipProbability;
                } catch (e) {
                    callback(e, null, null)
                }

                console.log("Temperature: " + tempF +
                    " F, Precipitation: " + precipPct + "%.");

                callback(null, tempF, precipPct); // null for no error!
            }
        );
    }
    catch (e) {
        callback(e, null, null)
    }
};


var http = require("http");
var https = require("https");

/**
 * Gets a JSON object over HTTP(s)
 *
 * @param options An object of options.
 * @param onResult Callback
 */
function getJSON(options, onResult) {
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function (res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function (err) {
        throw err;
    });

    req.end();
}
