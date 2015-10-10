var assert = require('assert');

var ExtPlaneEmitter, ExtPlane;

describe('ExtPlaneJs', function(){

    it('Connect to ExtPlane', function(done){

        ExtPlaneEmitter = require('../../ExtPlaneJs');
        ExtPlane = new ExtPlaneEmitter(require('../../config.json'));


        ExtPlane.on('loaded', function(){

            this.client.subscribe('sim/flightmodel/engine/ENGN_thro');

            assert.ok(ExtPlane.client);

            done(null);

        });

    });


    it('Subcribe to Engine Throttle Data Ref', function(done){

        ExtPlane.on('sim/flightmodel/engine/ENGN_thro', function(data_ref, value){

            assert.equal(data_ref, 'sim/flightmodel/engine/ENGN_thro');
            assert(typeof value === 'object', 'Is Float Array');
            done(null);

        });

    });


    it('Close Connection', function(done){
        ExtPlane.client.destroy();
        done(null);
    });

});
