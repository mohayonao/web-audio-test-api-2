"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioBufferFactory = require("../../src/factories/AudioBufferFactory");

describe("AudioBufferFactory", () => {
  it("should defined all properties", () => {
    const AudioBuffer = AudioBufferFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioBuffer");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioBuffer.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createBuffer()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const buffer = context.createBuffer(2, 128, 44100);

        assert(buffer instanceof api.AudioBuffer);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 128, sampleRate: 44100
        });

        assert(buffer instanceof api.AudioBuffer);
        assert(buffer.length === 128);
      });

      it("new instance with context", () => {
        const api = testTools.createAPI({ "/AudioBuffer/context": true });
        const context = new api.AudioContext();
        const buffer = new api.AudioBuffer(context, {
          numberOfChannels: 2, length: 128, sampleRate: 44100
        });

        assert(buffer instanceof api.AudioBuffer);
        assert(buffer.length === 128);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });

        assert.throws(() => {
          return new api.AudioBuffer({
            numberOfChannels: 2, length: 128, sampleRate: 44100
          });
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 128, sampleRate: 44100
        });

        assert(buffer.numberOfChannels === 2);
        assert(buffer.length === 128);
        assert(buffer.duration === 128 / 44100);
        assert(buffer.sampleRate === 44100);
      });
    });

    describe("getChannelData", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });

        assert(buffer.getChannelData(0) instanceof Float32Array);
        assert(buffer.getChannelData(0).length === 8);
      });
    });

    describe("copyFromChannel", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });
        const destination = new Float32Array(4);

        buffer.getChannelData(1).set([ 0, 0, 1, 2, 3, 4, 0, 0 ]);
        buffer.copyFromChannel(destination, 1, 2);

        assert.deepEqual(destination, [ 1, 2, 3, 4 ]);
      });
    });

    describe("copyToChannel", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });

        buffer.copyToChannel(new Float32Array([ 1, 2, 3, 4 ]), 1, 2);

        assert(buffer.getChannelData(1), [ 0, 0, 1, 2, 3, 4, 0, 0 ]);
      });
    });
  });

  describe("ancient properties", () => {
    describe("gain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 128, sampleRate: 44100
        });

        assert(buffer.gain === 1);

        buffer.gain = 0.5;
        assert(buffer.gain === 0.5);
      });
    });
  });
});
