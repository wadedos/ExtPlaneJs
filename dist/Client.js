"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const events_1 = require("events");
class Client extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.h = config.host;
        this.p = config.port;
        this.b = config.broadcast;
        this.d = config.debug;
        /**
         * Socket Connect
         */
        this.s = (0, net_1.connect)(config, () => {
            if (this.d)
                console.log(`Connected to ${this.h}:${this.p}`);
        });
        /**
         * On Socket End
         */
        this.s.on('end', () => {
            if (this.d)
                console.log('Disconnected from server');
        });
        /**
         * On Socket Error
         */
        this.s.on('error', (err) => {
            if (this.d)
                console.log('An error occurred!', err);
        });
    }
    /**
     *
     * Key Press
     *
     * @param {string} key_id - XPlane key ID
     */
    key(key_id) {
        this.s.write(`key ${key_id}\r\n`);
    }
    ;
    /**
     *
     * CMD Once
     *
     * @param {string} cmd - The command
     */
    cmd(cmd) {
        this.s.write(`cmd once ${cmd}\r\n`);
    }
    ;
    /**
     *
     * CMD Begin
     *
     * @param {string} cmd - The command
     */
    begin(cmd) {
        this.s.write(`cmd begin ${cmd}\r\n`);
    }
    ;
    /**
     *
     * CMD End
     *
     * @param {string} cmd - The command
     */
    end(cmd) {
        this.s.write(`cmd end ${cmd}\r\n`);
    }
    ;
    /**
     *
     * Button Press
     *
     * @param {string}  button_id - XPlane button ID
     */
    button(button_id) {
        this.s.write(`but ${button_id}\r\n`);
    }
    ;
    /**
     *
     * Release Button
     *
     * @param {string} button_id - XPlane button ID
     */
    release(button_id) {
        this.s.write(`rel ${button_id}\r\n`);
    }
    ;
    /**
     *
     * Set a Data Ref to a specific value
     *
     * @param {string} data_ref - the XPlane Data Ref
     * @param {string} value - ExtPlane Values
     */
    set(data_ref, value) {
        this.s.write(`set ${data_ref} ${value}\r\n`);
    }
    ;
    /**
     *
     * Subscribe to the XPlane Data Ref
     *
     * @param {string} data_ref - the XPlane Data Ref
     * @param {float} accuracy
     */
    subscribe(data_ref, accuracy) {
        this.s.write(`sub ${data_ref}${accuracy !== undefined ? ' ' + accuracy : ''}\r\n`);
    }
    ;
    /**
     *
     * Unsubscribe from the XPlane Data Ref
     *
     * @param {string} data_ref - the XPlane Data Ref
     */
    unsubscribe(data_ref) {
        this.s.write(`unsub ${data_ref}\r\n`);
    }
    ;
    /**
     *
     * How often ExtPlane should update its data from X-Plane, in seconds. Use as high value as possible here for best performance. For example 0.16 would mean 60Hz, 0.33 = 30Hz, 0.1 = 10Hz etc.. Must be a positive float. Default is 0.33.
     *
     * @param {float} value
     */
    interval(value) {
        this.s.write(`extplane-set update_interval ${value}\r\n`);
    }
    /**
     *
     * Disconnect from ExtPlane and then close the TCP socket
     */
    disconnect() {
        this.s.write(`disconnect\r\n`);
        this.s.end();
    }
    ;
}
exports.default = Client;
