'use strict';

const tcpServer = require('../lib/tcpServer');
const expect = require('chai').expect; 
const Chance = require('chance');
const chance = new Chance();
const repoConfig = require('../../config.json');

describe('ExtPlaneJs', function () {

  describe('ExtPlane Intergration Tests', () => {
   
    describe('TCP Server', () => {
      let server;

      before(async () => {
        server = await tcpServer.setup();
      });  

      it('connects to tcp server', () => {
        expect(server.listening).to.be.true;
      });

      after(tcpServer.tearDown);
    });

    describe('ExtPlane TCP Integration', () => {
      let server, socket, ExtPlane;
      
      const config = { ...repoConfig, broadcast: true, autoConnect: false };
      const ExtPlaneEmitter = require('../../extplane');
    
      before(async () => {
        server = await tcpServer.setup();
      });

      beforeEach(() => {
        ExtPlane = new ExtPlaneEmitter(config);
        socket = new Promise((resolve) => {
          server.once('connection', (socket) => {
            socket.write('EXTPLANE 1.1');
            resolve(socket);
          });
        });
        return ExtPlane.connect();
      })

      it('tcpServer is listening', () => {
        expect(server.listening).to.be.true;
      });

      it('connected to ExtPlane', () => {
        expect(ExtPlane.client.connected).to.be.true;
      });

      describe('data ref', () => {
        it('recieves correct integer data ref and value', (done) => {
          const dataRef = 'sim/flightmodel/engine/ENGN_thro';
          const sendValue = chance.integer();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef}\r\n`);
              sock.write(`ui ${dataRef} ${sendValue} \r\n`)
            });
          });
          
          ExtPlane.once('data-ref', (data_ref, value) => {
            expect(data_ref).to.be.equal(dataRef);
            expect(value).to.be.equal(sendValue);
            done();
          });
  
          ExtPlane.client.subscribe(dataRef);
        });
  
        it('recieves correct float data ref and value', (done) => {
          const dataRef = 'sim/flightmodel/engine/ENGN_thro';
          const sendValue = chance.floating();;
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef}\r\n`);
              sock.write(`uf ${dataRef} ${sendValue} \r\n`)
            });
          });
          
          ExtPlane.once('data-ref', (data_ref, value) => {
            expect(data_ref).to.be.equal(dataRef);
            expect(value).to.be.equal(sendValue);
            done();
          });
  
          ExtPlane.client.subscribe(dataRef);
        });
  
        it('recieves correct int array data ref and value', (done) => {
          const dataRef = 'sim/flightmodel/engine/ENGN_thro';
          const sendValue = chance.n(chance.integer, 4);
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef}\r\n`);
              sock.write(`uia ${dataRef} ${JSON.stringify(sendValue)} \r\n`)
            });
          });
          
          ExtPlane.once('data-ref', (data_ref, value) => {
            expect(data_ref).to.be.equal(dataRef);
            expect(value).to.include.members(sendValue);
            done();
          });
  
          ExtPlane.client.subscribe(dataRef);
        });
  
        it('recieves correct float array data ref and value', (done) => {
          const dataRef = 'sim/flightmodel/engine/ENGN_thro';
          const sendValue = chance.n(chance.floating, 4);
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef}\r\n`);
              sock.write(`ufa ${dataRef} ${JSON.stringify(sendValue)} \r\n`)
            });
          });
          
          ExtPlane.once('data-ref', (data_ref, value) => {
            expect(data_ref).to.be.equal(dataRef);
            expect(value).to.include.members(sendValue);
            done();
          });
  
          ExtPlane.client.subscribe(dataRef);
        });
  
        it('recieves correct base64 data ref and value', (done) => {
          const dataRef = 'sim/flightmodel/engine/ENGN_thro';
          const sendValue = chance.string();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef}\r\n`);
              sock.write(`ub ${dataRef} ${Buffer.from(sendValue).toString('base64')} \r\n`)
            });
          });
          
          ExtPlane.once('data-ref', (data_ref, value) => {
            expect(data_ref).to.be.equal(dataRef);
            expect(value).to.be.equal(sendValue);
            done();
          });
  
          ExtPlane.client.subscribe(dataRef);
        });
      });

      describe('client', () => {
        it('sends correct key', (done) => {
          const key = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`key ${key}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.key(key);
        });

        it('sends correct cmd begin', (done) => {
          const cmd = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`cmd begin ${cmd}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.begin(cmd);
        });

        it('sends correct cmd end', (done) => {
          const cmd = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`cmd end ${cmd}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.end(cmd);
        });

        it('sends correct button', (done) => {
          const button = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`but ${button}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.button(button);
        });

        it('sends correct releaseButon', (done) => {
          const releaseButon = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`rel ${releaseButon}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.release(releaseButon);
        });

        it('sends correct set data ref and value', (done) => {
          const dataRef = chance.word();
          const expectedValue = chance.integer();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`set ${dataRef} ${expectedValue}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.set(dataRef, expectedValue);
        });

        it('sends correct subscribe data ref with accuracy', (done) => {
          const dataRef = chance.word();
          const expectedValue = chance.integer();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef} ${expectedValue}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.subscribe(dataRef, expectedValue);
        });

        it('sends correct subscribe data ref', (done) => {
          const dataRef = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`sub ${dataRef}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.subscribe(dataRef);
        });

        it('sends correct unsubscribe data ref', (done) => {
          const dataRef = chance.word();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`unsub ${dataRef}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.unsubscribe(dataRef);
        });

        it('sends correct update interval', (done) => {
          const interval = chance.integer();
  
          socket.then((sock) => {
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`extplane-set update_interval ${interval}\r\n`);
              done();
            });
          });
            
          ExtPlane.client.interval(interval);
        });

        it('disconnects cleanly from extplane', (done) => {
          socket.then((sock) => {
            sock.once('close', () => {
              done();
            });
            sock.once('data', (buffer) => {
              const value = buffer.toString();
              expect(value).to.be.equal(`disconnect\r\n`);
              sock.end();
            });
          });
          ExtPlane.disconnect();
        });
      });

      afterEach(() => {
        ExtPlane.disconnect();
      });

      after(async () => {
        await tcpServer.tearDown();
      });

    });

  });

});
