/**
 *
 * @name: ExtPlaneJs
 * @author: Wade Wildbore - Bluu Interactive
 * @author: Brian Vo (Typescript Rewrite)
 * @description: ExtPlane TCP Connector for NodeJS
 * @see: https://github.com/vranki/ExtPlane - For more information
 */
/// <reference types="node" />
import { EventEmitter } from "events";
import Client from './Client';
interface Config {
    host: string;
    port: number;
    broadcast: boolean;
    debug: boolean;
}
export default class ExtPlaneJs extends EventEmitter {
    client: Client;
    config: Config;
    constructor(config: Config);
    /**
     *
     * Parse an Individual Data Ref
     *
     * @param {string} data_ref - The data_ref response
     * @param {function} cb - The done callback
     */
    parseDataRef(data_ref: string, cb: Function): any;
    /**
     *
     * Parse ExtPlanes TCP Text Based Response
     *
     * Override type value conversions from ExtPlanes response
     *
     * @param {string} - type
     * @param {string} - value
     */
    parseValue(type: string, value: string): any;
}
export {};
