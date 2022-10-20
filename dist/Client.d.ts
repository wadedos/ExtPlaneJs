/// <reference types="node" />
/// <reference types="node" />
import { Socket } from 'net';
import { EventEmitter } from 'events';
/**
 *
 * @name: ExtPlaneJs
 * @author: Wade Wildbore - Bluu Interactive
 * @author: Brian Vo (Typescript Rewrite)
 * @description: ExtPlane TCP Connector for NodeJS
 * @see: https://github.com/vranki/ExtPlane - For more information
 */
interface Config {
    host: string;
    port: number;
    broadcast: boolean;
    debug: boolean;
}
export default class Client extends EventEmitter {
    h: string;
    p: number;
    b: boolean;
    d: boolean;
    s: Socket;
    constructor(config: Config);
    /**
     *
     * Key Press
     *
     * @param {string} key_id - XPlane key ID
     */
    key(key_id: string): void;
    /**
     *
     * CMD Once
     *
     * @param {string} cmd - The command
     */
    cmd(cmd: string): void;
    /**
     *
     * CMD Begin
     *
     * @param {string} cmd - The command
     */
    begin(cmd: string): void;
    /**
     *
     * CMD End
     *
     * @param {string} cmd - The command
     */
    end(cmd: string): void;
    /**
     *
     * Button Press
     *
     * @param {string}  button_id - XPlane button ID
     */
    button(button_id: string): void;
    /**
     *
     * Release Button
     *
     * @param {string} button_id - XPlane button ID
     */
    release(button_id: string): void;
    /**
     *
     * Set a Data Ref to a specific value
     *
     * @param {string} data_ref - the XPlane Data Ref
     * @param {string} value - ExtPlane Values
     */
    set(data_ref: string, value: string): void;
    /**
     *
     * Subscribe to the XPlane Data Ref
     *
     * @param {string} data_ref - the XPlane Data Ref
     * @param {float} accuracy
     */
    subscribe(data_ref: string, accuracy?: number): void;
    /**
     *
     * Unsubscribe from the XPlane Data Ref
     *
     * @param {string} data_ref - the XPlane Data Ref
     */
    unsubscribe(data_ref: string): void;
    /**
     *
     * How often ExtPlane should update its data from X-Plane, in seconds. Use as high value as possible here for best performance. For example 0.16 would mean 60Hz, 0.33 = 30Hz, 0.1 = 10Hz etc.. Must be a positive float. Default is 0.33.
     *
     * @param {float} value
     */
    interval(value: number): void;
    /**
     *
     * Disconnect from ExtPlane and then close the TCP socket
     */
    disconnect(): void;
}
export {};
