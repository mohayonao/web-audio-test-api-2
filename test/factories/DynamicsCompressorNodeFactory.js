"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const DynamicsCompressorNodeFactory = require("../../src/factories/DynamicsCompressorNodeFactory");

describe("DynamicsCompressorNodeFactory", () => {
  it("should defined all properties", () => {
    const DynamicsCompressorNode = DynamicsCompressorNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("DynamicsCompressorNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(DynamicsCompressorNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createDynamicsCompressor()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createDynamicsCompressor();

        assert(node instanceof api.DynamicsCompressorNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {});

        assert(node instanceof api.DynamicsCompressorNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.DynamicsCompressorNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {});

        assert(node.threshold instanceof api.AudioParam);
        assert(node.threshold.value === -24);
        assert(node.knee instanceof api.AudioParam);
        assert(node.knee.value === 30);
        assert(node.ratio instanceof api.AudioParam);
        assert(node.ratio.value === 12);
        assert(node.reduction === 0);
        assert(node.attack instanceof api.AudioParam);
        assert(node.attack.value === 0.003);
        assert(node.release instanceof api.AudioParam);
        assert(node.release.value === 0.25);
      });
    });

    describe("threshold", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {
          threshold: -32
        });

        assert(node.threshold.value === -32);
      });
    });

    describe("knee", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {
          knee: 28
        });

        assert(node.knee.value === 28);
      });
    });

    describe("ratio", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {
          ratio: 8
        });

        assert(node.ratio.value === 8);
      });
    });

    describe("reduction", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {});

        assert(typeof node.reduction === "number");
      });

      it("/DynamicsCompressorNode/reduction/AudioParam: true", () => {
        const api = testTools.createAPI({ "/DynamicsCompressorNode/reduction/AudioParam": true });
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {});

        assert(node.reduction instanceof api.AudioParam);
      });
    });

    describe("attack", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {
          attack: 0.05
        });

        assert(node.attack.value === 0.05);
      });
    });

    describe("release", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DynamicsCompressorNode(context, {
          release: 0.5
        });

        assert(node.release.value === 0.5);
      });
    });
  });
});
