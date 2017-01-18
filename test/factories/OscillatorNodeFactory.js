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
        assert(node instanceof api.AudioScheduledSourceNode);
      });

      it("new instance extends AudioSourceNode", () => {
        const api = testTools.createAPI({ disabled: "/AudioScheduledSourceNode" });
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node instanceof api.OscillatorNode);
        assert(!(node instanceof api.AudioScheduledSourceNode));
        assert(node instanceof api.AudioSourceNode);
      });

      it("new instance extends AudioNode", () => {
        const api = testTools.createAPI({ disabled: /\/Audio(Scheduled)?SourceNode/ });
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node instanceof api.OscillatorNode);
        assert(!(node instanceof api.AudioSourceNode));
        assert(node instanceof api.AudioNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
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

    describe("type", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {
          type: "square"
        });

        assert(node.type === "square");

        node.type = "sawtooth";
        assert(node.type === "sawtooth");
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
        const wave = new api.PeriodicWave(context, {
          real: new Float32Array([ 0, 0 ]),
          imag: new Float32Array([ 0, 1 ]),
        });

        node.setPeriodicWave(wave);
      });
    });
  });

  describe("@deprecated", () => {
    describe("constants", () => {
      it("SINE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.SINE === api.types.OscillatorType.SINE);
        assert(node.SINE === api.OscillatorNode.SINE);
      });

      it("SQUARE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.SQUARE === api.types.OscillatorType.SQUARE);
        assert(node.SQUARE === api.OscillatorNode.SQUARE);
      });

      it("SAWTOOTH", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.SAWTOOTH === api.types.OscillatorType.SAWTOOTH);
        assert(node.SAWTOOTH === api.OscillatorNode.SAWTOOTH);
      });

      it("TRIANGLE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.TRIANGLE === api.types.OscillatorType.TRIANGLE);
        assert(node.TRIANGLE === api.OscillatorNode.TRIANGLE);
      });

      it("CUSTOM", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.CUSTOM === api.types.OscillatorType.CUSTOM);
        assert(node.CUSTOM === api.OscillatorNode.CUSTOM);
      });

      it("UNSCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.UNSCHEDULED_STATE === api.types.PlaybackStateType.UNSCHEDULED_STATE);
        assert(node.UNSCHEDULED_STATE === api.OscillatorNode.UNSCHEDULED_STATE);
      });

      it("SCHEDULED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.SCHEDULED_STATE === api.types.PlaybackStateType.SCHEDULED_STATE);
        assert(node.SCHEDULED_STATE === api.OscillatorNode.SCHEDULED_STATE);
      });

      it("PLAYING_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.PLAYING_STATE === api.types.PlaybackStateType.PLAYING_STATE);
        assert(node.PLAYING_STATE === api.OscillatorNode.PLAYING_STATE);
      });

      it("FINISHED_STATE", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.OscillatorNode(context, {});

        assert(node.FINISHED_STATE === api.types.PlaybackStateType.FINISHED_STATE);
        assert(node.FINISHED_STATE === api.OscillatorNode.FINISHED_STATE);
      });
    });

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
        const wave = new api.PeriodicWave(context, {
          real: new Float32Array([ 0, 0 ]),
          imag: new Float32Array([ 0, 1 ])
        });

        node.setWaveTable(wave);
      });
    });
  });
});
