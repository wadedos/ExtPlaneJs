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
const events_1 = require("events");
const Client_1 = __importDefault(require("./Client"));
const async_1 = __importDefault(require("async"));
class ExtPlaneJs extends events_1.EventEmitter {
    constructor(config) {
        super();
        // ExtPlane TCP Client
        this.client = new Client_1.default(config);
        this.config = config;
        // Couple the TCP clients on data event to ExtPlaneJs
        this.client.on('data', (data) => {
            this.emit('data', data);
        });
        /**
         *
         * Loaded
         *
         */
        this.on('loaded', () => {
            if (config.debug)
                console.log('ExtPlane Ready!');
        });
        /**
         *
         * Data
         *
         * @param {string} data
         */
        this.on('data', (data) => {
            // log incoming TCP stream
            //console.log(data.toString());
            if (data.toString().includes('EXTPLANE'))
                // loaded..
                return this.emit('loaded');
            // emit parse
            return this.emit('parse', data.toString());
        });
        /**
         *
         * Parse
         *
         * Either emit single data-ref events, or broadcast all data-ref events on one handler
         *
         * @param {string} data
         */
        this.on('parse', (data) => {
            const commands = data.trim().split('\n');
            async_1.default.each(commands, (cmd, cb) => {
                this.parseDataRef(cmd, cb);
            }, err => {
                if (err && config.debug)
                    console.log(err);
            });
        });
    }
    /**
     *
     * Parse an Individual Data Ref
     *
     * @param {string} data_ref - The data_ref response
     * @param {function} cb - The done callback
     */
    parseDataRef(data_ref, cb) {
        const params = data_ref.split(' ');
        // if not data-ref output, break
        if (params[0][0] !== 'u')
            return false;
        // data-ref
        data_ref = params[1];
        const type = params[0].substring(1);
        const value = this.parseValue(type, params[2]);
        // emit - data_ref, value or 'data-ref', data_ref, value
        !this.config.broadcast ? this.emit(data_ref, data_ref, value) : this.emit('data-ref', data_ref, value);
        // done
        return cb(null);
    }
    ;
    /**
     *
     * Parse ExtPlanes TCP Text Based Response
     *
     * Override type value conversions from ExtPlanes response
     *
     * @param {string} - type
     * @param {string} - value
     */
    parseValue(type, value) {
        switch (type) {
            // int
            case 'i':
                return parseInt(value);
            // float
            case 'f':
                return parseFloat(value);
            // int array
            case 'ia':
                return JSON.parse(value);
            // float array
            case 'fa':
                return JSON.parse(value);
            // base64 data
            case 'b':
                return Buffer.from(value, 'base64').toString('utf-8');
            default:
                return value;
        }
    }
    ;
}
exports.default = ExtPlaneJs;
;
