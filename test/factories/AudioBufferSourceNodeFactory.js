"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioScheduledSourceNodeFactory = require("../../src/factories/AudioScheduledSourceNodeFactory");
const AudioBufferSourceNodeFactory = require("../../src/factories/AudioBufferSourceNodeFactory");
const mixin = require("../../src/utils/mixin");

describe("AudioBufferSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create({}, class {});
    const AudioBufferSourceNode = mixin(AudioBufferSourceNodeFactory.create({}, class {}), AudioScheduledSourceNode);
    const properties = testTools.getPropertyNamesToNeed("AudioBufferSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioBufferSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createBufferSource()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createBufferSource();

        assert(node instanceof api.AudioBufferSourceNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node instanceof api.AudioBufferSourceNode);
        assert(node instanceof api.AudioScheduledSourceNode);
      });

      it("new instance extends AudioSourceNode", () => {
        const api = testTools.createAPI({ disabled: "/AudioScheduledSourceNode" });
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node instanceof api.AudioBufferSourceNode);
        assert(!(node instanceof api.AudioScheduledSourceNode));
        assert(node instanceof api.AudioSourceNode);
      });

      it("new instance extends AudioNode", () => {
        const api = testTools.createAPI({ disabled: /^\/Audio(Scheduled)?SourceNode/ });
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node instanceof api.AudioBufferSourceNode);
        assert(!(node instanceof api.AudioSourceNode));
        assert(node instanceof api.AudioNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioBufferSourceNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.buffer === null);
        assert(node.playbackRate instanceof api.AudioParam);
        assert(node.playbackRate.value === 1);
        assert(node.detune instanceof api.AudioParam);
        assert(node.detune.value === 0);
        assert(node.loop === false);
        assert(node.loopStart === 0);
        assert(node.loopEnd === 0);
      });
    });

    describe("buffer", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});
        const buffer = new api.AudioBuffer({
          numberOfChannels: 1, length: 128, sampleRate: 44100
        });

        node.buffer = buffer;
        assert(node.buffer === buffer);
      });
    });

    describe("playbackRate", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {
          playbackRate: 1.5
        });

        assert(node.playbackRate.value === 1.5);
      });
    });

    describe("detune", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {
          detune: 100
        });

        assert(node.detune.value === 100);
      });
    });

    describe("loop", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {
          loop: true
        });

        assert(node.loop === true);

        node.loop = false;
        assert(node.loop === false);
      });
    });

    describe("loopStart", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {
          loopStart: 1
        });

        assert(node.loopStart === 1);

        node.loopStart = 2;
        assert(node.loopStart === 2);
      });
    });

    describe("loopEnd", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {
          loopEnd: 1
        });

        assert(node.loopEnd === 1);

        node.loopEnd = 2;
        assert(node.loopEnd === 2);
      });
    });

    describe("start", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.start(0, 1, 2);
      });
    });
  });

  describe("ancient properties", () => {
    describe("constants", () => {
      it("UNSCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.UNSCHEDULED_STATE === api.types.PlaybackStateType.UNSCHEDULED_STATE);
        assert(node.UNSCHEDULED_STATE === api.AudioBufferSourceNode.UNSCHEDULED_STATE);
      });

      it("SCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.SCHEDULED_STATE === api.types.PlaybackStateType.SCHEDULED_STATE);
        assert(node.SCHEDULED_STATE === api.AudioBufferSourceNode.SCHEDULED_STATE);
      });

      it("PLAYING_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.PLAYING_STATE === api.types.PlaybackStateType.PLAYING_STATE);
        assert(node.PLAYING_STATE === api.AudioBufferSourceNode.PLAYING_STATE);
      });

      it("FINISHED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.FINISHED_STATE === api.types.PlaybackStateType.FINISHED_STATE);
        assert(node.FINISHED_STATE === api.AudioBufferSourceNode.FINISHED_STATE);
      });
    });

    describe("playbackState", () => {
      it("UNSCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.playbackState === api.types.PlaybackStateType.UNSCHEDULED_STATE);
      });

      it("SCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.start(0);

        assert(node.playbackState === api.types.PlaybackStateType.SCHEDULED_STATE);
      });

      it("PLAYING_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.start(0);

        context._.currentTime = 1;

        assert(node.playbackState === api.types.PlaybackStateType.PLAYING_STATE);
      });

      it("FINISHED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.start(0);
        node.stop(1);

        context._.currentTime = 2;

        assert(node.playbackState === api.types.PlaybackStateType.FINISHED_STATE);
      });
    });

    describe("gain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        assert(node.gain instanceof api.AudioParam);
        assert(node.gain.value === 1);
      });
    });

    describe("looping", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.loop = true;
        assert(node.looping === true);

        node.looping = false;
        assert(node.loop === false);
      });
    });

    describe("noteOn", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.noteOn(0);
      });
    });

    describe("noteGrainOn", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.noteGrainOn(0, 1, 2);
      });
    });

    describe("noteOff", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioBufferSourceNode(context, {});

        node.noteOn(0);
        node.noteOff(1);
      });
    });
  });
});
