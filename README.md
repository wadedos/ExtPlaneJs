# ExtPlaneJs #

[![NPM version][npm-image]][npm-url]
[![NPM version][npm-downloads]][npm-url]
[![Dependency Status][daviddm-image]][daviddm-url]


A JavaScript Client Library for NodeJs that uses the [ExtPlane plugin](https://github.com/vranki/ExtPlane).

Inspired by [ExtPlaneInterface for Java](https://github.com/pau662/ExtPlaneInterface) and [ExtPlaneNet for C#](https://github.com/swemaniac/ExtPlaneNet)

## Prerequisites
1. You need X-Plane (demo works fine) with the [ExtPlane plugin](https://github.com/vranki/ExtPlane) installed.
2. [NodeJs](https://nodejs.org) >= 4.0.0


## Installation
Install via NPM

```
$ npm install extplanejs
```


### Connecting to X-Plane

Make sure X-Plane is started and the plugin is installed and active.

### ExtPlaneJs Config
Either modify the config.json or modify the config object passed into ExtPlaneJs

```
{
    "host": "127.0.0.1",
    "port": 51000,
    "broadcast": false,
    "debug": true
}

```

### Running the example connector

1. Open your terminal
2. cd to ExtPlaneJs
3. Install Node.js Dependencies `npm install`
4. Run `npm start`

Watch your terminal as your X-Plane information is streamed on-screen

### Running the tests

1. Make sure X-Plane is running and in a current flight. Not on the QuickFlight screen.
2. Run `npm test`


# Example

```
var ExtPlaneJs = require('extplanejs');

var ExtPlane = new ExtPlaneJs({
    host: '127.0.0.1',
    port: 51000,
    broadcast: true
});

ExtPlane.on('loaded', function(){

	ExtPlane.client.interval(0.33);

	// Subscribe to the airspeed
	ExtPlane.client.subscribe('sim/cockpit2/gauges/indicators/airspeed_kts_pilot');

	// Handle all data-ref changes
	ExtPlane.on('data-ref', function(data_ref, value){
		console.log(data_ref+' - '+value);
	});

});

```

# ExtPlaneJS API

### ExtPlaneJs(config)
Instantiate ExtPlaneJs and try connect

### ExtPlaneJs.on(event)
Assign an event handler to the specific event

### ExtPlaneJs.client.*
Access the client API from ExtPlaneJs

### Events

- `loaded` - No parameters
- `data-ref` (data_ref, value) - Receive all data-ref events over one handler. Broadcast: true
- `sim/cockpit2/gauges/indicators/airspeed_kts_pilot` (data_ref, value) - Receive individual data-ref events. Broadcast: false



# Client API

### client.key(key_id)
Press a key

### client.once(cmd)
Execute a command

### client.begin(cmd)
Begin a command

### client.end(cmd)
End a command

### client.button(button_id)
Press a button

### client.release(button_id)
Release a button

### client.set(data_ref, value)
Set a data refs value

### client.subscribe(data_ref, [accuracy])
Subscribe to a data ref

### client.unsubscribe(data_ref)
Unsubscribe to a data ref

### client.interval(value)
Override the data update interval

### client.disconnect()
Send the disconnect command


# More information ?

See the example connector source in example.js for example subscriptions, methods available and event handlers for data refs


#  License
MIT License - Copyright © Bluu Interactive

[![Bluu](http://www.bluu.co.nz/async_js/img/wings.png)](http://www.bluu.co.nz)

[npm-image]: https://img.shields.io/npm/v/extplanejs.svg
[npm-url]: https://www.npmjs.com/package/extplanejs
[daviddm-image]: http://img.shields.io/david/wadeos/extplanejs.svg
[daviddm-url]: https://david-dm.org/wadeos/extplanejs
[npm-downloads]: https://img.shields.io/npm/dt/extplanejs.svg
