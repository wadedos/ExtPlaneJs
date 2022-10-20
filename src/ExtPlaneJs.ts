/**
 *
 * @name: ExtPlaneJs
 * @author: Wade Wildbore - Bluu Interactive
 * @author: Brian Vo (Typescript Rewrite)
 * @description: ExtPlane TCP Connector for NodeJS
 * @see: https://github.com/vranki/ExtPlane - For more information
 */

import { EventEmitter } from "events";
import Client from './Client';
import async from 'async';

interface Config {
    host: string;
    port: number;
    broadcast: boolean;
    debug: boolean;
}

export default class ExtPlaneJs extends EventEmitter {
    client: Client;
    config: Config;

    constructor(config: Config) {
        super();

        // ExtPlane TCP Client
        this.client = new Client(config);
        this.config = config;

        // Couple the TCP clients on data event to ExtPlaneJs
        this.client.s.on('data', (data: string) => {
            this.emit('data', data);
        });

        /**
         *
         * Loaded
         *
         */
        this.on('loaded', () => {
            if (config.debug) console.log('ExtPlane Ready!');
        });

        /**
         *
         * Data
         *
         * @param {string} data
         */
        this.on('data', (data: string) => {

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
        this.on('parse', (data: string) => {
            const commands = data.trim().split('\n');
            async.each(commands, (cmd, cb) => {
                this.parseDataRef(cmd, cb);
            }, err => {
                if (err && config.debug) console.log(err);
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
    parseDataRef(data_ref: string, cb: Function) {

        const params = data_ref.split(' ');

        // if not data-ref output, break
        if(params[0][0] !== 'u')
            return false;

        // data-ref
        data_ref = params[1];

        const type = params[0].substring(1);
        const value = this.parseValue(type, params[2]);

        // emit - data_ref, value or 'data-ref', data_ref, value
        !this.config.broadcast ? this.emit(data_ref, data_ref, value) : this.emit('data-ref', data_ref, value);

        // done
        return cb(null);
    };

    /**
     *
     * Parse ExtPlanes TCP Text Based Response
     *
     * Override type value conversions from ExtPlanes response
     *
     * @param {string} - type
     * @param {string} - value
     */
    parseValue(type: string, value: string){

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

    };

};
