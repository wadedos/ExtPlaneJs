# ExtPlaneJs #

A JavaScript Client Library for NodeJs that uses the [ExtPlane plugin](https://github.com/vranki/ExtPlane).

Inspired by [ExtPlaneInterface for Java](https://github.com/pau662/ExtPlaneInterface) and [ExtPlaneNet for C#](https://github.com/swemaniac/ExtPlaneNet)

## How To use
### Prerequisites
1. You need X-Plane (demo works fine) with the [ExtPlane plugin](https://github.com/vranki/ExtPlane) installed.
2. [NodeJs](https://nodejs.org) v.4.00

### Connecting to X-Plane

Make sure X-Plane is started and the plugin is installed and active.

### Edit Config
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

Watch you terminal as your X-Plane information is streamed on-screen


### More information ?

See the example connector source in index.js for example subscriptions, methods available and event handlers for data refs.


# Todo

Make this a npm module and test

#  License
MIT License - Copyright © Bluu Interactive

[![Bluu](http://www.bluu.co.nz/async_js/img/wings.png)](http://www.bluu.co.nz)
