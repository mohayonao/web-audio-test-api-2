"use strict";

require("run-with-mocha");

const assert = require("assert");
const sinon = require("sinon");
const testTools = require("./_test-tools")
const BaseAudioContextFactory = require("../../src/factories/BaseAudioContextFactory");

describe("BaseAudioContextFactory", () => {
  it("should defined all properties", () => {
    const BaseAudioContext = BaseAudioContextFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("BaseAudioContext");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(BaseAudioContext.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        assert(context instanceof api.BaseAudioContext);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });

        assert.throws(() => {
          return new api.BaseAudioContext({
            numberOfChannels: 2, sampleRate: 44100
          });
        }, TypeError);
      });

      it("throws error", () => {
        const api = testTools.createAPI();

        assert.throws(() => {
          return new api.BaseAudioContext({
            numberOfChannels: 0, length: 128, sampleRate: 44100
          });
        }, TypeError);
        assert.throws(() => {
          return new api.BaseAudioContext({
            numberOfChannels: 2, length: 0, sampleRate: 44100
          });
        }, TypeError);
        assert.throws(() => {
          return new api.BaseAudioContext({
            numberOfChannels: 2, length: 128, sampleRate: 0
          });
        }, TypeError);
      });
    });

    describe("destination", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        assert(context.destination instanceof api.AudioDestinationNode);
      });
    });

    describe("sampleRate", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        assert(context.sampleRate === 44100);
      });
    });

    describe("currentTime", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        assert(context.currentTime === 0);
      });
    });

    describe("listener", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        assert(context.listener instanceof api.AudioListener);
      });
    });

    describe("state", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        assert(typeof context.state === "string");
      });
    });

    describe("onstatechange", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const onstatechange = () => {};

        assert(context.onstatechange === null);

        context.onstatechange = onstatechange;
        assert(context.onstatechange === onstatechange);
      });
    });

    describe("suspend", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();

        context.onstatechange = handler1;
        context.addEventListener("statechange", handler2);

        return context.suspend().then(() => {
          assert(context.state === "suspended");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
        });
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        context.close();

        assert.throws(() => {
          context.suspend();
        }, TypeError);
      });
    });

    describe("resume", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();

        context.onstatechange = handler1;
        context.addEventListener("statechange", handler2);

        return context.resume().then(() => {
          assert(context.state === "running");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
        });
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        context.close();

        assert.throws(() => {
          context.resume();
        }, TypeError);
      });
    });

    describe("close", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();

        context.onstatechange = handler1;
        context.addEventListener("statechange", handler2);

        return context.close().then(() => {
          assert(context.state === "closed");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
        });
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });

        context.close();

        assert.throws(() => {
          context.close();
        }, TypeError);
      });
    });

    describe("createBuffer", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createBuffer(1, 128, 44100);

        assert(node instanceof api.AudioBuffer);
        assert(node.numberOfChannels === 1);
        assert(node.length === 128);
        assert(node.sampleRate === 44100);
      });

      it("mixToMono", () => {
        const api = testTools.createAPI({ "/AudioContext/createBuffer/mixToMono": true });
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const buffer = context.createBuffer(new Float32Array(128).buffer, true);

        assert(buffer instanceof api.AudioBuffer);
      });
    });

    describe("decodeAudioData", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const audioData = new Uint8Array(128).buffer;

        api.on("decodeAudioData", (handler) => {
          handler(new api.AudioBuffer({
            numberOfChannels: 2, length: 8, sampleRate: 44100
          }));
        });

        return context.decodeAudioData(audioData).then((buffer) => {
          assert(buffer instanceof api.AudioBuffer);
        });
      });

      it("failed", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const audioData = new Uint8Array(128).buffer;
        const error = new Error();

        api.on("decodeAudioData", (handler) => {
          handler(error);
        });

        return context.decodeAudioData(audioData).catch((result) => {
          assert(result === error);
        });
      });

      it("not configured", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const audioData = new Uint8Array(128).buffer;

        return context.decodeAudioData(audioData).catch((result) => {
          assert(result instanceof Error);
        });
      });

      it("/AudioContext/decodeAudioData/void: true", (done) => {
        const api = testTools.createAPI({ "/AudioContext/decodeAudioData/void": true });
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const audioData = new Uint8Array(128).buffer;

        api.on("decodeAudioData", (handler) => {
          handler(new api.AudioBuffer({
            numberOfChannels: 2, length: 8, sampleRate: 44100
          }));
        });

        const result = context.decodeAudioData(audioData, (buffer) => {
          assert(buffer instanceof api.AudioBuffer);
          done();
        });

        assert(typeof result === "undefined");
      });
    });

    describe("createBufferSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createBufferSource();

        assert(node instanceof api.AudioBufferSourceNode);
      });
    });

    describe("createAudioWorker", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        return context.createAudioWorker("").then((node) => {
          assert(node instanceof api.AudioWorker);
        });
      });
    });

    describe("createConstantSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createConstantSource();

        assert(node instanceof api.ConstantSourceNode);
      });
    });

    describe("createScriptProcessor", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createScriptProcessor(2048, 1, 2);

        assert(node instanceof api.ScriptProcessorNode);
        assert(node.bufferSize === 2048);
      });
    });

    describe("createAnalyser", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createAnalyser();

        assert(node instanceof api.AnalyserNode);
      });
    });

    describe("createGain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createGain();

        assert(node instanceof api.GainNode);
      });
    });

    describe("createDelay", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createDelay();

        assert(node instanceof api.DelayNode);
      });
    });

    describe("createBiquadFilter", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createBiquadFilter();

        assert(node instanceof api.BiquadFilterNode);
      });
    });

    describe("createIIRFilter", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createIIRFilter([ 1, 0 ], [ 1, 0 ]);

        assert(node instanceof api.IIRFilterNode);
      });
    });

    describe("createWaveShaper", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createWaveShaper();

        assert(node instanceof api.WaveShaperNode);
      });
    });

    describe("createPanner", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createPanner();

        assert(node instanceof api.PannerNode);
      });
    });

    describe("createSpatialPanner", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createSpatialPanner();

        assert(node instanceof api.SpatialPannerNode);
      });
    });

    describe("createStereoPanner", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createStereoPanner();

        assert(node instanceof api.StereoPannerNode);
      });
    });

    describe("createConvolver", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createConvolver();

        assert(node instanceof api.ConvolverNode);
      });
    });

    describe("createChannelSplitter", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createChannelSplitter();

        assert(node instanceof api.ChannelSplitterNode);
      });
    });

    describe("createChannelMerger", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createChannelMerger();

        assert(node instanceof api.ChannelMergerNode);
      });
    });

    describe("createDynamicsCompressor", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createDynamicsCompressor();

        assert(node instanceof api.DynamicsCompressorNode);
      });
    });

    describe("createOscillator", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createOscillator();

        assert(node instanceof api.OscillatorNode);
      });
    });

    describe("createPeriodicWave", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createPeriodicWave(new Float32Array([ 0, 0 ]), new Float32Array([ 0, 1 ]));

        assert(node instanceof api.PeriodicWave);
      });
    });

    describe("createMediaElementSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createMediaElementSource(new api.HTMLMediaElement());

        assert(node instanceof api.MediaElementAudioSourceNode);
      });
    });

    describe("createMediaStreamSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createMediaStreamSource(new api.MediaStream());

        assert(node instanceof api.MediaStreamAudioSourceNode);
      });
    });

    describe("createMediaStreamDestination", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.BaseAudioContext({
          numberOfChannels: 2, sampleRate: 44100
        });
        const node = context.createMediaStreamDestination();

        assert(node instanceof api.MediaStreamAudioDestinationNode);
      });
    });
  });
});
