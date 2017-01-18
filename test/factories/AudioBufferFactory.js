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

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });

        assert.throws(() => {
          return new api.AudioBuffer({
            numberOfChannels: 2, length: 128, sampleRate: 44100
          });
        }, TypeError);
      });

      it("throws error when without AudioContext", () => {
        const api = testTools.createAPI({ "/AudioBuffer/context": true });

        assert.throws(() => {
          return new api.AudioBuffer({
            numberOfChannels: 2, length: 128, sampleRate: 44100
          });
        }, TypeError);
      });

      it("throw error", () => {
        const api = testTools.createAPI({});

        assert.throws(() => {
          return new api.AudioBuffer({
            numberOfChannels: 0, length: 128, sampleRate: 44100
          });
        }, TypeError);
        assert.throws(() => {
          return new api.AudioBuffer({
            numberOfChannels: 2, length: 0, sampleRate: 44100
          });
        }, TypeError);
        assert.throws(() => {
          return new api.AudioBuffer({
            numberOfChannels: 2, length: 128, sampleRate: 0
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

      it("throw error", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });

        assert.throws(() => {
          return buffer.getChannelData(2);
        }, TypeError);
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

      it("throws", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });
        const destination = new Float32Array(4);

        assert.throws(() => {
          buffer.copyFromChannel(destination, 2, 0);
        }, TypeError);
        assert.throws(() => {
          buffer.copyFromChannel(destination, 0, 10);
        }, TypeError);
      });
    });

    describe("copyToChannel", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });
        const source = new Float32Array([ 1, 2, 3, 4 ]);

        buffer.copyToChannel(source, 1, 2);

        assert(buffer.getChannelData(1), [ 0, 0, 1, 2, 3, 4, 0, 0 ]);
      });

      it("throws", () => {
        const api = testTools.createAPI();
        const buffer = new api.AudioBuffer({
          numberOfChannels: 2, length: 8, sampleRate: 44100
        });
        const source = new Float32Array([ 1, 2, 3, 4 ]);

        assert.throws(() => {
          buffer.copyToChannel(source, 2, 0);
        }, TypeError);
        assert.throws(() => {
          buffer.copyToChannel(source, 0, 10);
        }, TypeError);
      });
    });
  });

  describe("@deprecated", () => {
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
