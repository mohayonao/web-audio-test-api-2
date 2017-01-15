"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const BiquadFilterNodeFactory = require("../../src/factories/BiquadFilterNodeFactory");

describe("BiquadFilterNodeFactory", () => {
  it("should defined all properties", () => {
    const BiquadFilterNode = BiquadFilterNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("BiquadFilterNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(BiquadFilterNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createBiquadFilter()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createBiquadFilter();

        assert(node instanceof api.BiquadFilterNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {});

        assert(node instanceof api.BiquadFilterNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.BiquadFilterNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {});

        assert(node.type === "lowpass");
        assert(node.frequency instanceof api.AudioParam);
        assert(node.frequency.value === 350);
        assert(node.detune instanceof api.AudioParam);
        assert(node.detune.value === 0);
        assert(node.Q instanceof api.AudioParam);
        assert(node.Q.value === 1);
        assert(node.gain instanceof api.AudioParam);
        assert(node.gain.value === 0);
      });
    });

    describe("type", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {
          type: "highpass"
        });

        assert(node.type === "highpass");

        node.type = "bandpass";
        assert(node.type === "bandpass");
      });
    });

    describe("frequency", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {
          frequency: 1000
        });

        assert(node.frequency.value === 1000);
      });
    });

    describe("detune", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {
          detune: 100
        });

        assert(node.detune.value === 100);
      });
    });

    describe("Q", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {
          Q: 6
        });

        assert(node.Q.value === 6);
      });
    });

    describe("gain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {
          gain: 4
        });

        assert(node.gain.value === 4);
      });
    });

    describe("getFrequencyResponse", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.BiquadFilterNode(context, {});
        const frequencyHz = new Float32Array([ 440, 880, 1760, 3520 ]);
        const magResponse = new Float32Array(4);
        const phaseResponse = new Float32Array(4);

        node.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
      });
    });
  });
});
