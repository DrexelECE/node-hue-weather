## Requirements

* [Philips Hue](http://www2.meethue.com/en-us/) bridge and at least one light.

* At least one [Amazon Dash Button](http://www.amazon.com/b/?node=10667898011&sort=date-desc-rank&lo=digital-text).

* A computer capable of running [Node.js](https://nodejs.org/en/).

* A forecast.io [API key](https://developer.forecast.io/).

## Installation

* Install [Node.js](https://nodejs.org/en/) and [git](https://git-scm.com/downloads).

* Clone this repository:

```
git clone https://github.com/DrexelECE/node-hue-weather.git
```

* Install the dependencies:

```
cd node-hue-weather
npm i
```

## Setup

* Configure the Amazon Dash button.

Download the [Amazon Shopping](https://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000625601&forceHttps=0) smartphone app and connect the button to your WiFi network. Do not complete the setup process!: exit the app when you are asked to select a product.

* Add a Dash Button:

```
node findDash
```

Follow the instructions to pair a button with the program.

* Find a Philips Hue Bridge:

```
node findHue
```

Follow the instructions to pair the Hue bridge.

* Add the forecast.io API key to the properties file.

## Running

* Run the app:

```
node app
```

The app will listen for button presses and flash the lights in sequence upon a successful button press.

Adding the flag '-test' will run the program offline, randomly generating weather data for demonstration/testing purposes:

```
node app -test
```

## Contributing

Run the following command to stop tracking the properties.json and log files:

```
git rm --cached properties.json npm-debug.log
```
