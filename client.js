'use strict'

const net = require('net');
const debug = require('debug')('extplane:client');
const _ = require('lodash');

/**
 *
 * Client
 *
 * Used to provide a JavaScript API for accessing the ExtPlane TCP API in NodeJs
 *
 * @class Client
 */
class Client {
  constructor(config) {
    this.config = config;
    this.connected = false;
  }

  /**
   *
   * Connect to the TCP server
   *
   * @return {promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      debug('Connecting to ExtPlane, using configuration %o', this.config);
      this.client = net.connect(this.config);
      this.client.on('error', (err) => {
        debug('Error connecting to ExtPlane %o', err);
        reject(err);
      });
      this.client.on('end', this.disconnect.bind(this));
      this.client.once('data', this.loadHandler(resolve));
    }).then(() => {
      this.connected = true;
    }).catch((e) => {
      this.connected = false;
      debug('Error connecting to ExtPlane %o', e);
    });
  }

  /**
   *
   * Disconnect from ExtPlane and then close the TCP socket
   *
   * @return {void}
   */
  disconnect() {
    if (!this.connected) return;
    debug('Disconnecting from ExtPlane');
    this.client.write('disconnect\r\n');
    this.client.end();
    this.client.destroy();
    this.connected = false;
    delete this.client;
  }

  /**
   *
   * Wait for the EXTPLANE string before continuing
   *
   * @param {Function} resolve
   * @return {Function}
   */
  loadHandler(resolve) {
    /**
     * @param {Buffer} data
     */
    return (data) => {
      debug('Connected to ExtPlane');
      debug('Load Handler %o', data.toString());
      if (_.includes(data.toString(), 'EXTPLANE')) {
        resolve();
      }
    }
  }

  /**
   *
   * Key Press
   *
   * @param {string} key_id - XPlane key ID
   * @return {void}
   */
  key(key_id) {
    if (!this.connected) return;
    this.client.write(`key ${key_id}\r\n`);
  }

  /**
   *
   * CMD Begin
   *
   * @param {string} cmd - The command
   * @return {void}
   */
  begin(cmd) {
    if (!this.connected) return;
    this.client.write(`cmd begin ${cmd}\r\n`);
  }

  /**
   *
   * CMD End
   *
   * @param {string} cmd - The command
   * @return {void}
   */
  end(cmd) {
    if (!this.connected) return;
    this.client.write(`cmd end ${cmd}\r\n`);
  }

  /**
   *
   * Button Press
   *
   * @param {string}  button_id - XPlane button ID
   * @return {void}
   */
  button(button_id) {
    if (!this.connected) return;
    this.client.write(`but ${button_id}\r\n`);
  }

  /**
   *
   * Release Button
   *
   * @param {string} button_id - XPlane button ID
   * @return {void}
   */
  release(button_id) {
    if (!this.connected) return;
    this.client.write(`rel ${button_id}\r\n`);
  }

  /**
   *
   * Set a Data Ref to a specific value
   *
   * @param {string} data_ref - the XPlane Data Ref
   * @param {string} value - ExtPlane Values
   * @return {void}
   */
  set(data_ref, value) {
    if (!this.connected) return;
    this.client.write(`set ${data_ref} ${value}\r\n`);
  }

  /**
   *
   * Subscribe to the XPlane Data Ref
   *
   * @param {string} data_ref - the XPlane Data Ref
   * @param {float} accuracy
   * @return {void}
   */
  subscribe(data_ref, accuracy) {
    if (!this.connected) return;
    this.client.write(`sub ${data_ref}${accuracy ? ` ${accuracy}`: ''}\r\n`);
  }

  /**
   *
   * Unsubscribe from the XPlane Data Ref
   *
   * @param {string} data_ref - the XPlane Data Ref
   * @return {void}
   */
  unsubscribe(data_ref) {
    if (!this.connected) return;
    this.client.write(`unsub ${data_ref}\r\n`);
  }

  /**
   *
   * How often ExtPlane should update its data from X-Plane, in seconds. Use as high value as possible here for best performance. For example 0.16 would mean 60Hz, 0.33 = 30Hz, 0.1 = 10Hz etc.. Must be a positive float. Default is 0.33.
   *
   * @param {float} value
   * @return {void}
   */
  interval(value) {
    if (!this.connected) return;
    this.client.write(`extplane-set update_interval ${value}\r\n`);
  }

}

module.exports = Client;