"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AnalyserNodeFactory = require("../../src/factories/AnalyserNodeFactory");

describe("AnalyserNodeFactory", () => {
  it("should defined all properties", () => {
    const AnalyserNode = AnalyserNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AnalyserNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AnalyserNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createAnalyser()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createAnalyser();

        assert(node instanceof api.AnalyserNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AnalyserNode(context, {});

        assert(node instanceof api.AnalyserNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AnalyserNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createAnalyser();

        assert(node.fftSize === 2048);
        assert(node.frequencyBinCount === 1024);
        assert(node.maxDecibels === -30);
        assert(node.minDecibels === -100);
        assert(node.smoothingTimeConstant === 0.8);
      });
    });

    describe("fftSize", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AnalyserNode(context, {
          fftSize: 512
        });

        assert(node.fftSize === 512);

        node.fftSize = 256;
        assert(node.fftSize === 256);
      });
    });

    describe("frequencyBinCount", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AnalyserNode(context, {
          fftSize: 512
        });

        assert(node.frequencyBinCount === 256);

        node.fftSize = 256;
        assert(node.frequencyBinCount === 128);
      });
    });

    describe("maxDecibels", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AnalyserNode(context, {
          maxDecibels: -20
        });

        assert(node.maxDecibels === -20);

        node.maxDecibels = -10;
        assert(node.maxDecibels === -10);
      });
    });

    describe("minDecibels", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AnalyserNode(context, {
          minDecibels: -110
        });

        assert(node.minDecibels === -110);

        node.minDecibels = -120;
        assert(node.minDecibels === -120);
      });
    });

    describe("smoothingTimeConstant", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AnalyserNode(context, {
          smoothingTimeConstant: 0.7
        });

        assert(node.smoothingTimeConstant === 0.7);

        node.smoothingTimeConstant = 0.6;
        assert(node.smoothingTimeConstant === 0.6);
      });
    });

    describe("getByteFrequencyData", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createAnalyser();
        const array = new Uint8Array(node.frequencyBinCount);

        node.getByteFrequencyData(array);
      });
    });

    describe("getByteTimeDomainData", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createAnalyser();
        const array = new Uint8Array(node.fftSize);

        node.getByteTimeDomainData(array);
      });
    });

    describe("getFloatFrequencyData", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createAnalyser();
        const array = new Float32Array(node.frequencyBinCount);

        node.getFloatFrequencyData(array);
      });
    });

    describe("getFloatTimeDomainData", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createAnalyser();
        const array = new Float32Array(node.fftSize);

        node.getFloatTimeDomainData(array);
      });
    });
  });
});
