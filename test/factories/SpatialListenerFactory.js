"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const SpatialListenerFactory = require("../../src/factories/SpatialListenerFactory");

describe("SpatialListenerFactory", () => {
  it("should defined all properties", () => {
    const SpatialListener = SpatialListenerFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("SpatialListener");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(SpatialListener.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.SpatialListener(context, {});

        assert(node instanceof api.SpatialListener);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.SpatialListener(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.SpatialListener(context, {});

        assert(node.positionX instanceof api.AudioParam);
        assert(node.positionX.value === 0);
        assert(node.positionY instanceof api.AudioParam);
        assert(node.positionY.value === 0);
        assert(node.positionZ instanceof api.AudioParam);
        assert(node.positionZ.value === 0);
        assert(node.forwardX instanceof api.AudioParam);
        assert(node.forwardX.value === 0);
        assert(node.forwardY instanceof api.AudioParam);
        assert(node.forwardY.value === 0);
        assert(node.forwardZ instanceof api.AudioParam);
        assert(node.forwardZ.value === -1);
        assert(node.upX instanceof api.AudioParam);
        assert(node.upX.value === 0);
        assert(node.upY instanceof api.AudioParam);
        assert(node.upY.value === 1);
        assert(node.upZ instanceof api.AudioParam);
        assert(node.upZ.value === 0);
      });
    });
  });
});
