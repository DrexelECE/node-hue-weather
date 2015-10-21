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

* Add a Dash Button

```
node findDash.js
```

Follow the instructions to pair a button with the program.

* Find a Philips Hue Bridge

```
node findHue.js
```

Follow the instructions to pair the Hue bridge.

## Running

* Run the app:

```
node app.js
```

The app will listen for button presses and flash the lights in sequence upon a successful button press.

Specifying the argument '-test' will run the program offline, randomly generating weather data.

```
node app.js -test
```
