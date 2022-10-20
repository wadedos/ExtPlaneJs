"use strict";
/**
 *
 * @name: ExtPlaneJs
 * @author: Wade Wildbore - Bluu Interactive
 * @author: Brian Vo (Typescript Rewrite)
 * @description: ExtPlane TCP Connector for NodeJS
 * @see: https://github.com/vranki/ExtPlane - For more information
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExtPlaneJs_1 = __importDefault(require("./ExtPlaneJs"));
const config_json_1 = __importDefault(require("./config.json"));
const ExtPlane = new ExtPlaneJs_1.default(config_json_1.default);
// Loaded CB
ExtPlane.on('loaded', () => {
    ExtPlane.client.subscribe('sim/flightmodel/engine/ENGN_thro');
    //this.client.unsubscribe('sim/flightmodel/engine/ENGN_thro');
    // See: http://www.xsquawkbox.net/xpsdk/mediawiki/XPLMUtilities - For key and button ids
    //this.client.subscribe('sim/flightmodel/position/local_y', 100);
    //this.client.subscribe('sim/cockpit/electrical/night_vision_on');
    //this.client.subscribe('sim/flightmodel/position/q');
    ExtPlane.client.subscribe('sim/cockpit2/engine/indicators/N1_percent');
    //this.client.write('sub sim/flightmodel/engine/ENGN_thro');
    //this.client.write('sub sim/cockpit/electrical/night_vision_on');
    //this.client.write('sub sim/flightmodel/position/local_y 100');
    //this.client.write('set sim/flightmodel/engine/ENGN_thro [1,0]');
    //this.client.write('set sim/flightmodel/engine/ENGN_thro [0,0]');
    //this.client.set('data_ref', 'value');
    //this.client.key('key_id');
    //this.client.button('button_id');
    //this.client.release('button_id');
    //this.client.disconnect();
});
// Listen on invidiual data-ref events - broadcast = false
ExtPlane.on('sim/flightmodel/engine/ENGN_thro', (data_ref, value) => {
    console.log(`${data_ref} - ${value}`);
});
// Listen for all data-ref events - broadcast = true
ExtPlane.on('data-ref', (data_ref, value) => {
    console.log(`${data_ref} - ${value}`);
});
