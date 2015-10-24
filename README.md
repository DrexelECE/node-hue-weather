## Requirements

* [Philips Hue](http://www2.meethue.com/en-us/) bridge and at least one light.

* At least one [Amazon Dash Button](http://www.amazon.com/b/?node=10667898011&sort=date-desc-rank&lo=digital-text).

* A computer capable of running [Node.js](https://nodejs.org/en/).

* A forecast.io [API key](https://developer.forecast.io/).

## Installation

##### Install the system dependencies:

The primary dependencies are [Node.js](https://nodejs.org/en/),
[libpcap](https://wiki.wireshark.org/libpcap), and
[git](https://git-scm.com/downloads). Configuration will depend on your system.

For Raspbian (Raspberry Pi - tested on Jessie):
```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install git build-essential libpcap-dev -y
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
dpkg -i node_latest_armhf.deb
rm node_latest_armhf.deb
```

##### Clone this repository:

```
git clone https://github.com/DrexelECE/node-hue-weather.git
```

##### Install the node dependencies:

```
cd node-hue-weather
npm i
```

## Setup

##### Configure the Amazon Dash button.

Download the [Amazon Shopping](https://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000625601&forceHttps=0) smartphone app and connect the button to your WiFi network. Do not complete the setup process! Exit the app when you are asked to select a product.

##### Add a Dash Button:

From the /node-hue-weather folder:

```
node findDash
```

Press the button on the Dash Button when prompted. You may have to do this a few times depending on how many devices are submitting arp requests on your network. It also seems that you have to wait about 30 seconds between button presses. Otherwise the button won't respond. Note that the Dash Button's MAC address should appear twice in succession.

When you are confident you have found the correct MAC address for your Dash Button, ctrl-C to exit the findDash program and copy the MAC address. Then,

```
node addDash XX:XX:XX:XX:XX:XX
```
replacing the 'XX:XX:XX:XX:XX:XX' with the MAC address you want to add. You can add multiple Dash buttons by repeating this process.

##### Find a Philips Hue Bridge:

```
node findHue
```

If a Hue bridge is found on the local network, its IP will automatically be added to the configuration file. Note that the first Hue bridge found will be added.

Alternatively, you can add the IP of the bridge via:

```
node addToProperties philips_hue_bridge_ip XXX.XXX.X.XXX
```

where the Xs are replaced by the IP address of the bridge.

##### Add the forecast.io API key to the properties file.

```
node addForecastApi APIKEY
```

##### Add your location

TODO

##### Add properties manually

Alternatively, you can add all the properties to the properties.json file manually. This is useful if one of the above processes fails or you already know some of the relevant information.

## Running

##### Run the app:

```
node app
```

The app will listen for button presses and flash the lights in sequence upon a successful button press.

Adding the flag '-test' will run the program offline, randomly generating weather data for demonstration/testing purposes:

```
node app -test
```

## Contributing

Please don't:
```
git add .
```

We want to not commit local properties.json and npm config info.
