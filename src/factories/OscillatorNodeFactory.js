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
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {OscillatorType} opts.type
     * @param {number} opts.frequency
     * @param {number} opts.detune
     * @param {PeriodicWave?} opts.periodicWave
     */
    constructor(context, opts = {}) {
      const type = defaults(opts.type, DEFAULT_TYPE);
      const frequency = defaults(opts.frequency, DEFAULT_FREQUENCY);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const periodicWave = defaults(opts.periodicWave, null);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        if (!(this instanceof api.AudioScheduledSourceNode)) {
          initialize.call(this, api, opts);
        }
      } finally { lock.lock(); }

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

    /**
     * @type {OscillatorType}
     */
    get type() {
      return this._.type;
    }

    set type(value) {
      this._.type = value;
      this._.periodicWave = null;
    }

    /**
     * @type {AudioParam}
     */
    get frequency() {
      return this._.frequency;
    }

    /**
     * @type {AudioParam}
     */
    get detune() {
      return this._.detune;
    }

    /**
     * @param {PeriodicWave} periodicWave
     * @return {void}
     */
    setPeriodicWave(periodicWave) {
      this._.periodicWave = periodicWave;
    }

    /**
     * @deprecated
     * @type {OscillatorType}
     */
    get SINE() {
      return api.types.OscillatorType.SINE;
    }

    /**
     * @deprecated
     * @type {OscillatorType}
     */
    get SQUARE() {
      return api.types.OscillatorType.SQUARE;
    }

    /**
     * @deprecated
     * @type {OscillatorType}
     */
    get SAWTOOTH() {
      return api.types.OscillatorType.SAWTOOTH;
    }

    /**
     * @deprecated
     * @type {OscillatorType}
     */
    get TRIANGLE() {
      return api.types.OscillatorType.TRIANGLE;
    }

    /**
     * @deprecated
     * @type {OscillatorType}
     */
    get CUSTOM() {
      return api.types.OscillatorType.CUSTOM;
    }

    /**
     * @deprecated
     * @type {PlaybackStateType}
     */
    get UNSCHEDULED_STATE() {
      return api.types.PlaybackStateType.UNSCHEDULED_STATE;
    }

    /**
     * @deprecated
     * @type {PlaybackStateType}
     */
    get SCHEDULED_STATE() {
      return api.types.PlaybackStateType.SCHEDULED_STATE;
    }

    /**
     * @deprecated
     * @type {PlaybackStateType}
     */
    get PLAYING_STATE() {
      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    /**
     * @deprecated
     * @type {PlaybackStateType}
     */
    get FINISHED_STATE() {
      return api.types.PlaybackStateType.FINISHED_STATE;
    }

    /**
     * @deprecated
     * @type {PlaybackStateType}
     */
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

    /**
     * @deprecated
     * @param {number} when
     * @return {void}
     */
    noteOn(when = 0) {
      start.call(this, when);
    }

    /**
     * @deprecated
     * @param {number} when
     * @return {void}
     */
    noteOff(when = 0) {
      stop.call(this, when);
    }

    /**
     * @deprecated
     * @param {PeriodicWave} waveTable
     * @return {void}
     */
    setWaveTable(waveTable) {
      this._.type = OscillatorType.CUSTOM;
      this._.periodicWave = waveTable;
    }
  }
  return OscillatorNode;
}

module.exports = { create };
