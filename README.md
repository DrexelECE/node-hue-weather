## Requirements

* [Philips Hue](http://www2.meethue.com/en-us/) bridge and at least one light.

* At least one [Amazon Dash Button](http://www.amazon.com/b/?node=10667898011&sort=date-desc-rank&lo=digital-text).

* A computer capable of running [Node.js](https://nodejs.org/en/).

* A forecast.io [API key](https://developer.forecast.io/).

## Installation

### Install [Node.js](https://nodejs.org/en/), [libpcap](https://wiki.wireshark.org/libpcap), and [git](https://git-scm.com/downloads).

### Clone this repository:

```
git clone https://github.com/DrexelECE/node-hue-weather.git
```

### Install the dependencies:

```
cd node-hue-weather
npm i
```

## Setup

### Configure the Amazon Dash button.

Download the [Amazon Shopping](https://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000625601&forceHttps=0) smartphone app and connect the button to your WiFi network. Do not complete the setup process!: exit the app when you are asked to select a product.

### Add a Dash Button:

```
node findDash
```

Press the button on the Dash Button when prompted. You may have to do this a few times depending on how many devices are submitting arp requests on your network. It also seems that you have to wait 10-20 seconds between button presses. Otherwise the button won't respond. Note that the Dash Button's MAC address should appear twice in succession.

When you are confident you have found the correct MAC address for your Dash Button, ctrl-C to exit the findDash program and copy the MAC address. Then,

```
node addDash XX:XX:XX:XX:XX:XX
```
replacing the 'XX:XX:XX:XX:XX:XX' with the MAC address you want to add. You can add multiple Dash buttons by repeating this process.

### Find a Philips Hue Bridge:

```
node findHue
```

Follow the instructions to pair the Hue bridge.

### Add the forecast.io API key to the properties file.

## Running

### Run the app:

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
