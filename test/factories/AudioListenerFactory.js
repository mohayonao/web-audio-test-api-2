"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const SpatialListenerFactory = require("../../src/factories/SpatialListenerFactory");
const AudioListenerFactory = require("../../src/factories/AudioListenerFactory");
const mixin = require("../../src/utils/mixin");

describe("AudioListenerFactory", () => {
  it("should defined all properties", () => {
    const SpatialListener = SpatialListenerFactory.create({}, class {});
    const AudioListener = mixin(AudioListenerFactory.create({}, class {}), SpatialListener);
    const properties = testTools.getPropertyNamesToNeed("AudioListener");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioListener.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.listener", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.listener;

        assert(node instanceof api.AudioListener);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioListener(context, {});

        assert(node instanceof api.AudioListener);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioListener(context, {});
        }, TypeError);
      });
    });

    describe("setPosition", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioListener(context, {});

        node.setPosition(1, 2, 3);

        assert(node.positionX.value === 1);
        assert(node.positionY.value === 2);
        assert(node.positionZ.value === 3);
      });
    });

    describe("setOrientation", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioListener(context, {});

        node.setOrientation(1, 2, 3, 4, 5, 6);

        assert(node.forwardX.value === 1);
        assert(node.forwardY.value === 2);
        assert(node.forwardZ.value === 3);
        assert(node.upX.value === 4);
        assert(node.upY.value === 5);
        assert(node.upZ.value === 6);
      });
    });

    describe("setVelocity", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioListener(context, {});

        node.setVelocity(1, 2, 3);
      });
    });
  });

  describe("@deprecated", () => {
    describe("gain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.listener;

        assert(node.gain === 1);

        node.gain = 0.8;
        assert(node.gain === 0.8);
      });
    });

    describe("dopplerFactor", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.listener;

        assert(node.dopplerFactor === 1);

        node.dopplerFactor = 0.8;
        assert(node.dopplerFactor === 0.8);
      });
    });

    describe("speedOfSound", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.listener;

        assert(node.speedOfSound === 343.3);

        node.speedOfSound = 340.29;
        assert(node.speedOfSound === 340.29);
      });
    });
  });
});
