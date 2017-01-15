"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioScheduledSourceNodeFactory = require("../../src/factories/AudioScheduledSourceNodeFactory");
const OscillatorNodeFactory = require("../../src/factories/OscillatorNodeFactory");
const mixin = require("../../src/utils/mixin");

describe("OscillatorNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create({}, class {});
    const OscillatorNode = mixin(OscillatorNodeFactory.create({}, class {}), AudioScheduledSourceNode);
    const properties = testTools.getPropertyNamesToNeed("OscillatorNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(OscillatorNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createOscillator()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createOscillator();

        assert(node instanceof api.OscillatorNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node instanceof api.OscillatorNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.OscillatorNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.type === "sine");
        assert(node.frequency instanceof api.AudioParam);
        assert(node.frequency.value === 440);
        assert(node.detune instanceof api.AudioParam);
        assert(node.detune.value === 0);
      });
    });

    describe("frequency", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {
          frequency: 880
        });

        assert(node.frequency.value === 880);
      });
    });

    describe("detune", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {
          detune: 100
        });

        assert(node.detune.value === 100);
      });
    });

    describe("setPeriodicWave", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});
        const wave = new api.PeriodicWave([ 0, 0 ], [ 0, 1 ]);

        node.setPeriodicWave(wave);
      });
    });
  });

  describe("ancient properties", () => {
    describe("playbackState", () => {
      it("UNSCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.playbackState === api.types.PlaybackStateType.UNSCHEDULED_STATE);
      });

      it("SCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        node.start(0);

        assert(node.playbackState === api.types.PlaybackStateType.SCHEDULED_STATE);
      });

      it("PLAYING_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        node.start(0);

        context._.currentTime = 1;

        assert(node.playbackState === api.types.PlaybackStateType.PLAYING_STATE);
      });

      it("FINISHED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        node.start(0);
        node.stop(1);

        context._.currentTime = 2;

        assert(node.playbackState === api.types.PlaybackStateType.FINISHED_STATE);
      });
    });

    describe("noteOn", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        node.noteOn(0);
      });
    });

    describe("noteOff", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        node.noteOn(0);
        node.noteOff(1);
      });
    });

    describe("setWaveTable", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});
        const wave = new api.PeriodicWave([ 0, 0 ], [ 0, 1 ]);

        node.setWaveTable(wave);
      });
    });
  });
});
