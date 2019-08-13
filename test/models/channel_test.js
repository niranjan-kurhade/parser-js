const { expect } = require('chai');
const Channel = require('../../lib/models/channel');
const js = { description: 'test', parameters: { param1: { description: 'param1', location: '$message.headers#/x-param1', schema: { type: 'string' } } }, 'x-test': 'testing' };

describe('Channel', () => {
  describe('#ext()', () => {
    it('should support extensions', () => {
      const d = new Channel(js);
      expect(d.ext('x-test')).to.be.equal(js['x-test']);
    });
  });
  
  describe('#description()', function () {
    it('should return a string', () => {
      const d = new Channel(js);
      expect(d.description()).to.be.equal(js.description);
    });
  });
   
  describe('#parameters()', function () {
    it('should return a map of ChannelParameter objects', () => {
      const d = new Channel(js);
      expect(typeof d.parameters()).to.be.equal('object');
      expect(d.parameters().param1.constructor.name).to.equal('ChannelParameter');
      expect(d.parameters().param1.json()).to.equal(js.parameters.param1);
    });
  });
   
  describe('#parameter()', function () {
    it('should return a specific ChannelParameter object', () => {
      const d = new Channel(js);
      expect(d.parameter('param1').constructor.name).to.be.equal('ChannelParameter');
      expect(d.parameter('param1').json()).to.equal(js.parameters.param1);
    });
  });
  
  describe('#publish()', function () {
    it('should return a PublishOperation object', () => {
      const jsWithPub = { publish: { description: 'pub' } };
      const d = new Channel(jsWithPub);
      expect(d.publish().constructor.name).to.be.equal('PublishOperation');
      expect(d.publish().json()).to.equal(jsWithPub.publish);
    });
  });
  
  describe('#subscribe()', function () {
    it('should return a SubscribeOperation object', () => {
      const jsWithSub = { subscribe: { description: 'sub' } };
      const d = new Channel(jsWithSub);
      expect(d.subscribe().constructor.name).to.be.equal('SubscribeOperation');
      expect(d.subscribe().json()).to.equal(jsWithSub.subscribe);
    });
  });
   
  describe('#hasPublish()', function () {
    it('should return true if the channel contains the publish operation', () => {
      const d = new Channel({ publish: { description: 'pub' } });
      expect(d.hasPublish()).to.be.equal(true);
      const d2 = new Channel({ subscribe: { description: 'sub' } });
      expect(d2.hasPublish()).to.be.equal(false);
    });
  });
  
  describe('#hasSubscribe()', function () {
    it('should return true if the channel contains the publish operation', () => {
      const d = new Channel({ publish: { description: 'pub' } });
      expect(d.hasSubscribe()).to.be.equal(false);
      const d2 = new Channel({ subscribe: { description: 'sub' } });
      expect(d2.hasSubscribe()).to.be.equal(true);
    });
  });
});
