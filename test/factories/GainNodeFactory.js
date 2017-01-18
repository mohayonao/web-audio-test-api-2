"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const GainNodeFactory = require("../../src/factories/GainNodeFactory");

describe("GainNodeFactory", () => {
  it("should defined all properties", () => {
    const GainNode = GainNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("GainNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(GainNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createGain()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createGain();

        assert(node instanceof api.GainNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.GainNode(context, {});

        assert(node instanceof api.GainNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.GainNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.GainNode(context, {});

        assert(node.gain instanceof api.AudioParam);
        assert(node.gain.value === 1);
      });
    });

    describe("gain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.GainNode(context, {
          gain: 0.8
        });

        assert(node.gain.value === 0.8);
      });
    });
  });
});
