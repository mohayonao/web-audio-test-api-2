"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const WaveShaperNodeFactory = require("../../src/factories/WaveShaperNodeFactory");

describe("WaveShaperNodeFactory", () => {
  it("should defined all properties", () => {
    const WaveShaperNode = WaveShaperNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("WaveShaperNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(WaveShaperNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createWaveShaper()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createWaveShaper();

        assert(node instanceof api.WaveShaperNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.WaveShaperNode(context, {});

        assert(node instanceof api.WaveShaperNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.WaveShaperNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.WaveShaperNode(context, {});

        assert(node.curve === null);
        assert(node.oversample === "none");
      });
    });

    describe("curve", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.WaveShaperNode(context, {});
        const curve = new Float32Array(8);

        node.curve = curve;
        assert(node.curve === curve);
      });
    });

    describe("oversample", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.WaveShaperNode(context, {
          oversample: "2x"
        });

        node.oversample = "2x";

        node.oversample = "4x";
        assert(node.oversample === "4x");
      });
    });
  });
});
