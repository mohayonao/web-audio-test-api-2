"use strict";

const OscillatorType = require("../types/OscillatorType");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");
const { initialize, start, stop } = require("./AudioScheduledSourceNodeFactory");

const DEFAULT_TYPE = OscillatorType.SINE;
const DEFAULT_FREQUENCY = 440;
const DEFAULT_DETUNE = 0;

function create(api, AudioNode) {
  class OscillatorNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/OscillatorNode")) {
        throw new TypeError("Illegal constructor");
      }

      const type = defaults(opts.type, DEFAULT_TYPE);
      const frequency = defaults(opts.frequency, DEFAULT_FREQUENCY);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const periodicWave = defaults(opts.periodicWave, null);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      if (!(this instanceof api.AudioScheduledSourceNode)) {
        initialize.call(this, api, opts);
      }
      lock.lock();

      this._.className = "OscillatorNode";
      this._.type = type;
      this._.frequency = new api.AudioParam(context, {
        name: "frequency", defaultValue: DEFAULT_FREQUENCY, value: frequency,
        minValue: -context.sampleRate / 2, maxValue: context.sampleRate / 2
      });
      this._.detune = new api.AudioParam(context, {
        name: "detune", defaultValue: DEFAULT_DETUNE, value: detune
      });
      this._.periodicWave = periodicWave;
    }

    get type() {
      return this._.type;
    }

    set type(value) {
      this._.type = value;
      this._.periodicWave = null;
    }

    get frequency() {
      return this._.frequency;
    }

    get detune() {
      return this._.detune;
    }

    setPeriodicWave(periodicWave) {
      this._.periodicWave = periodicWave;
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    static get SINE() {
      return api.types.OscillatorType.SINE;
    }

    static get SQUARE() {
      return api.types.OscillatorType.SQUARE;
    }

    static get SAWTOOTH() {
      return api.types.OscillatorType.SAWTOOTH;
    }

    static get TRIANGLE() {
      return api.types.OscillatorType.TRIANGLE;
    }

    static get CUSTOM() {
      return api.types.OscillatorType.CUSTOM;
    }

    static get UNSCHEDULED_STATE() {
      return api.types.PlaybackStateType.UNSCHEDULED_STATE;
    }

    static get SCHEDULED_STATE() {
      return api.types.PlaybackStateType.SCHEDULED_STATE;
    }

    static get PLAYING_STATE() {
      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    static get FINISHED_STATE() {
      return api.types.PlaybackStateType.FINISHED_STATE;
    }

    get SINE() {
      return api.types.OscillatorType.SINE;
    }

    get SQUARE() {
      return api.types.OscillatorType.SQUARE;
    }

    get SAWTOOTH() {
      return api.types.OscillatorType.SAWTOOTH;
    }

    get TRIANGLE() {
      return api.types.OscillatorType.TRIANGLE;
    }

    get CUSTOM() {
      return api.types.OscillatorType.CUSTOM;
    }

    get UNSCHEDULED_STATE() {
      return api.types.PlaybackStateType.UNSCHEDULED_STATE;
    }

    get SCHEDULED_STATE() {
      return api.types.PlaybackStateType.SCHEDULED_STATE;
    }

    get PLAYING_STATE() {
      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    get FINISHED_STATE() {
      return api.types.PlaybackStateType.FINISHED_STATE;
    }

    get playbackState() {
      if (this._.startTime === Infinity) {
        return api.types.PlaybackStateType.UNSCHEDULED_STATE;
      }

      const currentTime = this.context.currentTime;

      if (currentTime <= this._.startTime) {
        return api.types.PlaybackStateType.SCHEDULED_STATE;
      }

      if (this._.stopTime < currentTime) {
        return api.types.PlaybackStateType.FINISHED_STATE;
      }

      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    noteOn(when = 0) {
      start.call(this, when);
    }

    noteOff(when = 0) {
      stop.call(this, when);
    }

    setWaveTable(waveTable) {
      this._.type = OscillatorType.CUSTOM;
      this._.periodicWave = waveTable;
    }
  }
  return OscillatorNode;
}

module.exports = { create };
