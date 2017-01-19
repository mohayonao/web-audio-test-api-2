"use strict";

require("run-with-mocha");

const assert = require("assert");
const sinon = require("sinon");
const testTools = require("./_test-tools")
const BaseAudioContextFactory = require("../../src/factories/BaseAudioContextFactory");
const AudioContextFactory = require("../../src/factories/AudioContextFactory");
const mixin = require("../../src/utils/mixin");

describe("AudioContextFactory", () => {
  it("should defined all properties", () => {
    const BaseAudioContext = BaseAudioContextFactory.create({}, class {});
    const AudioContext = mixin(AudioContextFactory.create({}, class {}), BaseAudioContext);
    const properties = testTools.getPropertyNamesToNeed("AudioContext");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioContext.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        assert(context instanceof api.AudioContext);
        assert(context instanceof api.BaseAudioContext);
      });

      it("new instance without BaseAudioContext", () => {
        const api = testTools.createAPI({ "disabled": "/BaseAudioContext" });
        const context = new api.AudioContext();

        assert(context instanceof api.AudioContext);
        assert(!(context instanceof api.BaseAudioContext));
        assert(context instanceof api.EventTarget);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        assert(context.currentTime === 0);
        assert(context.state === "running");
      });
    });

    describe("baseLatency", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        assert(typeof context.baseLatency === "number");
      });
    });

    describe("outputLatency", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        assert(typeof context.outputLatency === "number");
      });
    });

    describe("getOutputTimestamp", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const outputTimestamp = context.getOutputTimestamp();

        assert(typeof outputTimestamp.contextTime === "number");
        assert(typeof outputTimestamp.performanceTime === "number");
      });
    });

    describe("close", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
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
        const context = new api.AudioContext();

        context.close();
        assert.throws(() => {
          context.close();
        }, TypeError);
      });
    });

    describe("suspend", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
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
        const context = new api.AudioContext();

        context.close();
        assert.throws(() => {
          context.suspend();
        }, TypeError);
      });
    });

    describe("createMediaElementSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createMediaElementSource(new api.HTMLMediaElement());

        assert(node instanceof api.MediaElementAudioSourceNode);
      });
    });

    describe("createMediaStreamSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createMediaStreamSource(new api.MediaStream());

        assert(node instanceof api.MediaStreamAudioSourceNode);
      });
    });

    describe("createMediaStreamTrackSource", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createMediaStreamTrackSource(new api.AudioMediaStreamTrack());

        assert(node instanceof api.MediaStreamTrackAudioSourceNode);
      });
    });

    describe("createMediaStreamDestination", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createMediaStreamDestination();

        assert(node instanceof api.MediaStreamAudioDestinationNode);
      });
    });
  });

  describe("OfflineAudioContext", () => {
    describe("oncomplete", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const oncomplete = () => {};

        assert(context.oncomplete === null);

        context.oncomplete = oncomplete;
        assert(context.oncomplete === oncomplete);
      });
    });

    describe("startRendering", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/OfflineAudioContext/startRendering/promise": true });
        const context = new api.AudioContext();
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();
        const handler3 = sinon.spy();

        context._.length = 128;

        context.onstatechange = handler1;
        context.oncomplete = handler2;
        context.addEventListener("complete", handler3);

        return context.startRendering().then((renderedBuffer) => {
          assert(renderedBuffer instanceof api.AudioBuffer);
          assert(context.state === "closed");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
          assert(handler3.callCount === 1);
          assert(handler2.args[0][0].renderedBuffer instanceof api.AudioBuffer);
          assert(handler3.args[0][0].renderedBuffer instanceof api.AudioBuffer);
        });
      });

      it("/OfflineAudioContext/startRendering/void: true", (done) => {
        const api = testTools.createAPI({ "/OfflineAudioContext/startRendering/void": true });
        const context = new api.AudioContext();
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();
        const handler3 = sinon.spy();

        context._.length = 128;

        context.onstatechange = handler1;
        context.oncomplete = handler2;
        context.addEventListener("complete", handler3);

        assert(typeof context.startRendering() === "undefined");

        setTimeout(() => {
          assert(context.state === "closed");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
          assert(handler3.callCount === 1);
          assert(handler2.args[0][0].renderedBuffer instanceof api.AudioBuffer);
          assert(handler3.args[0][0].renderedBuffer instanceof api.AudioBuffer);
          done();
        }, 0);
      });
    });
  });

  describe("@deprecated", () => {
    describe("activeSourceCount", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        assert(context.activeSourceCount === 0);
      });
    });

    describe("createJavaScriptNode", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createJavaScriptNode(2048, 1, 2);

        assert(node instanceof api.ScriptProcessorNode);
        assert(node.bufferSize === 2048);
      });
    });

    describe("createGainNode", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createGainNode();

        assert(node instanceof api.GainNode);
      });
    });

    describe("createDelayNode", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createDelayNode();

        assert(node instanceof api.DelayNode);
      });
    });

    describe("createWaveTable", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createWaveTable(new Float32Array([ 0, 0 ]), new Float32Array([ 0, 1 ]));

        assert(node instanceof api.PeriodicWave);
      });
    });
  });
});
