'use strict'

const EventEmitter = require('events').EventEmitter;
const Client = require('./client');
const base64 = require('base-64');
const _ = require('lodash');
const debug = require('debug')('extplane:emitter');

class ExtPlaneJs extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.client = new Client(this.config);
    this.on('data', this.data);
    this.on('parse', this.parse);
    if (this.config.autoConnect) {
      this.connect();
    }
  }

  /**
   * Connect the underlying client and setup the data event
   *
   * @return {Promise<void>}
   */
  async connect() {
    await this.client.connect();
    this.client.client.on('data', (d) => this.data(d.toString()));
    this.emit('loaded');
  }

  /**
   * Disconnect the underlying client
   * @return {void}
   */
  disconnect() {
    return this.client.disconnect();
  }

  /**
   * Data
   *
   * @param {string} data
   */
  data(data) {
    return this.emit('parse', data.toString());
  }

  /**
   *
   * Parse
   *
   * Either emit single data-ref events, or broadcast all data-ref events on one handler
   *
   * @param {string} data
   */
  parse(data) {
    debug(`Parse %o`, data);
    const commands = data.trim().split('\n')
    commands.forEach((cmd) => 
      this.parseDataRef(cmd)
    );
  }

  /**
   *
   * Parse an Individual Data Ref
   *
   * @param {string} data_ref - The data_ref response
   * @param {function} callback - The done callback
   */
  parseDataRef(data_ref) {
    const params = data_ref.split(' ');

    if (params[0][0] !== 'u') return;

    // data-ref
    data_ref = params[1];
  
    const type = params[0].substring(1);
    const value = this.parseValue(type, params[2]);

    const toBroadcast = this.config.broadcast;
    const eventName = toBroadcast ? 'data-ref' : data_ref;

    debug('Emit %s %o', eventName, { data_ref, value });
    this.emit(eventName, data_ref, value);
  }

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
        // data
      case 'b':
        return base64.decode(value);
      default:
        return value;
    }
  }

}

module.exports = ExtPlaneJs