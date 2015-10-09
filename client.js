'use strict';

var net = require('net');

module.exports = function(config){

    var client = net.connect(config, function(){
        console.log('Connected to '+config.host+':'+config.port);
    });

    client.on('end', function(){
        console.log('disconnected from server');
    });

    /**
     *
     * Key Press
     *
     * @param {string} key_id - XPlane key ID
     */
    client.key = function(key_id){
        this.write('key '+key_id+'\r\n');
    };

    /**
     *
     * CMD Once
     *
     * @param {string} cmd - The command
     */
    client.cmd = function(cmd){
        this.write('cmd once '+cmd+'\r\n');
    };

    /**
     *
     * CMD Begin
     *
     * @param {string} cmd - The command
     */
    client.begin = function(cmd){
        this.write('cmd begin '+cmd+'\r\n');
    };

    /**
     *
     * CMD End
     *
     * @param {string} cmd - The command
     */
    client.end = function(cmd){
        this.write('cmd end '+cmd+'\r\n');
    };

    /**
     *
     * Button Press
     *
     * @param {string}  button_id - XPlane button ID
     */
    client.button = function(button_id){
        this.write('but '+button_id+'\r\n');
    };

    /**
     *
     * Release Button
     *
     * @param {string} button_id - XPlane button ID
     */
    client.release = function(button_id){
        this.write('rel '+button_id+'\r\n');
    };

    /**
     *
     * Set a Data Ref to a specific value
     *
     * @param {string} data_ref - the XPlane Data Ref
     * @param {string} value - ExtPlane Values
     */
    client.set = function(data_ref, value){
        this.write('set '+data_ref+' '+value+'\r\n');
    };

    /**
     *
     * Subscribe to the XPlane Data Ref
     *
     * @param {string} data_ref - the XPlane Data Ref
     */
    client.subscribe = function(data_ref, accuracy){
        accuracy = (accuracy !== undefined ? ' '+accuracy : '');
        this.write('sub '+data_ref+accuracy+'\r\n');
    };

    /**
     *
     * Unsubscribe from the XPlane Data Ref
     *
     * @param {string} data_ref - the XPlane Data Ref
     */
    client.unsubscribe = function(data_ref){
        this.write('unsub '+data_ref+'\r\n');
    };

    /**
     *
     * How often ExtPlane should update its data from X-Plane, in seconds. Use as high value as possible here for best performance. For example 0.16 would mean 60Hz, 0.33 = 30Hz, 0.1 = 10Hz etc.. Must be a positive float. Default is 0.33.
     *
     * @param {float} value
     */
    client.interval = function(value){
        this.write('extplane-set update_interval '+value+'\r\n');
    }

    /**
     *
     * Disconnect from ExtPlane and then close the TCP socket
     */
    client.disconnect = function(){
        this.write('disconnect'+'\r\n');
        this.end();
    };

    return client;

};
