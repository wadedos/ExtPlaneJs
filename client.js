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
     * Disconnect from ExtPlane and then close the TCP socket
     */
    client.disconnect = function(){
        this.write('disconnect'+'\r\n');
        this.end();
    };

    return client;

};
