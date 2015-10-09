# ExtPlaneJs #

A JavaScript Client Library for NodeJs that uses the [ExtPlane plugin](https://github.com/vranki/ExtPlane).

Inspired by [ExtPlaneInterface for Java](https://github.com/pau662/ExtPlaneInterface) and [ExtPlaneNet for C#](https://github.com/swemaniac/ExtPlaneNet)

## How To use
### Prerequisites
1. You need X-Plane (demo works fine) with the [ExtPlane plugin](https://github.com/vranki/ExtPlane) installed.
2. [NodeJs](https://nodejs.org) v.4.00

### Connecting to X-Plane

Make sure X-Plane is started and the plugin is installed and active.

### ExtPlane Config
Either modify the config.json or modify the config object passed into ExtPlaneJs

```
{
    "host": "127.0.0.1",
    "port": 51000,
    "broadcast": false
}

```

### Running the example connector

1. Open your terminal
2. cd to ExtPlaneJs
3. Install Node.js Dependencies `npm install`
4. Run `npm start`

Watch your terminal as your X-Plane information is streamed on-screen


# Example

```
var ExtPlaneJs = require('ExtPlaneJs');

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

## Client API

```
	
	// Key Press
	client.key(key_id)
	
	// CMD Once
	client.cmd(cmd)
	
	// CMD Begin
	cilent.begin(cmd)
	
	// CMD End
	client.end(cmd)
	
	// Button Press
	client.button(button_id)
	
	// Release Button
	client.release(button_id)
	
	// Set DataRef
	client.set(data_ref, value)
	
	// Subscribe
	client.subscribe(data_ref, accuracy)
	
	// Unsubscribe
	client.unsubscribe(data_ref)
	
	// Interval
	client.interval(value)
	
	// Disconnect
	client.disconnect()
	
```


### More information ?

See the example connector source in index.js for example subscriptions, methods available and event handlers for data refs

# Todo

Make this a npm module and test

#  License
MIT License - Copyright © Bluu Interactive

[![Bluu](http://www.bluu.co.nz/async_js/img/wings.png)](http://www.bluu.co.nz)
