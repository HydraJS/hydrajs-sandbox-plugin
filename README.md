# hydrajs-sandbox-plugin

Is a plugin to maintain backward compatibility with, Hydra.js, lower version than 2.8.0.

## Update to version 1.0.0

[![Build Status](https://travis-ci.org/HydraJS/hydrajs-sandbox-plugin.png)](https://travis-ci.org/HydraJS/hydrajs-sandbox-plugin)

[Changelog](https://raw.github.com/HydraJS/hydrajs-sandbox-plugin/master/changelog.txt)

## Install

Install with [Bower](http://bower.io)

    bower install hydrajs-sandbox-plugin

Install with [Component](http://component.io)

    component install hydrajs-sandbox-plugin

Install with [NPM](http://npmjs.org)

    npm install hydrajs-sandbox-plugin

### Use in browser

Insert in your html code:

	<script type="text/javascript" src="hydra.js"></script
	<script type="text/javascript" src="hydrajs-sandbox-plugin.js"></script>

### Use with requirejs

Insert in your code:

    define(['hydrajs-sandbox-plugin'], function () {
        // code here.
    });

## How it works

It should be used to manage global events, and this plugin is needed to maintain compatibility with previous version to 2.8.0 of Hydra when the new Bus object has been implemented.

### Common usage

hydrajs-sandbox-plugin extends Hydra.js library adding new methods.

#### new Hydra.action().listen

Using this method your code will start listening events.

    new Hydra.action().listen( ['eventType'], callback, module );

#### new Hydra.action().notify

Using this method your code will trigger the specified event.

    new Hydra.action().notify( { type: 'eventType', data: {} } );

#### new Hydra.action().stopListen

Using this method you code will stop listening events.

    new Hydra.action().stopListen( ['eventType'], module );

## API
### Hydra
#### action
Hydra.action is a constructor that creates the sandbox to manage events and it should be created using *new*.

##### listen - Params [Array - event names, Function - callback to execute when the event is triggered, Object - The context to execute the callback ]
##### notify - Params [Object - type and data ]
##### stopListen - Params: [Array - event names, Object - context object where the event is being listened]

# License
hydrajs-sandbox-plugin is licensed under MIT license. (see LICENSE file)