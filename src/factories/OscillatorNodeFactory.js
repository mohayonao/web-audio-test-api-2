"use strict";

const OscillatorType = require("../types/OscillatorType");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");
const { initialize, start, stop } = require("./AudioScheduledSourceNodeFactory");

const DEFAULT_TYPE = OscillatorType.SINE;
const DEFAULT_FREQUENCY = 440;
const DEFAULT_DETUNE = 0;

function create(api, AudioNode) {
  class OscillatorNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createOscillator()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {OscillatorType} opts.type
     * @param {finite} opts.frequency
     * @param {finite} opts.detune
     * @param {PeriodicWave?} opts.periodicWave
     */
    constructor(context, opts = {}) {
      const type = defaults(opts.type, DEFAULT_TYPE);
      const frequency = defaults(opts.frequency, DEFAULT_FREQUENCY);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const periodicWave = defaults(opts.periodicWave, null);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        this._.className = "OscillatorNode";
        if (!(this instanceof api.AudioScheduledSourceNode)) {
          initialize.call(this, api, opts);
        }
      } finally { lock.lock(); }

      this._.type = type;
      this._.frequency = new api.AudioParam(context, {
        name: "Oscillator.frequency", defaultValue: DEFAULT_FREQUENCY, value: frequency,
        minValue: -context.sampleRate / 2, maxValue: context.sampleRate / 2
      });
      this._.detune = new api.AudioParam(context, {
        name: "Oscillator.detune", defaultValue: DEFAULT_DETUNE, value: detune
      });
      this._.periodicWave = periodicWave;

      if (periodicWave !== null) {
        this._.type = OscillatorType.CUSTOM;
      }
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
      this._.type = OscillatorType.CUSTOM;
      this._.periodicWave = periodicWave;
    }

    /**
     * @deprecated 2012-12-13 - use string ("sine") instead
     * @type {OscillatorType}
     */
    get SINE() {
      return api.types.OscillatorType.SINE;
    }

    /**
     * @deprecated 2012-12-13 - use string ("square") instead
     * @type {OscillatorType}
     */
    get SQUARE() {
      return api.types.OscillatorType.SQUARE;
    }

    /**
     * @deprecated 2012-12-13 - use string ("sawtooth") instead
     * @type {OscillatorType}
     */
    get SAWTOOTH() {
      return api.types.OscillatorType.SAWTOOTH;
    }

    /**
     * @deprecated 2012-12-13 - use string ("triangle") instead
     * @type {OscillatorType}
     */
    get TRIANGLE() {
      return api.types.OscillatorType.TRIANGLE;
    }

    /**
     * @deprecated 2012-12-13 - use string ("custom") instead
     * @type {OscillatorType}
     */
    get CUSTOM() {
      return api.types.OscillatorType.CUSTOM;
    }

    /**
     * @deprecated 2013-10-10
     * @type {PlaybackStateType}
     */
    get UNSCHEDULED_STATE() {
      return api.types.PlaybackStateType.UNSCHEDULED_STATE;
    }

    /**
     * @deprecated 2013-10-10
     * @type {PlaybackStateType}
     */
    get SCHEDULED_STATE() {
      return api.types.PlaybackStateType.SCHEDULED_STATE;
    }

    /**
     * @deprecated 2013-10-10
     * @type {PlaybackStateType}
     */
    get PLAYING_STATE() {
      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    /**
     * @deprecated 2013-10-10
     * @type {PlaybackStateType}
     */
    get FINISHED_STATE() {
      return api.types.PlaybackStateType.FINISHED_STATE;
    }

    /**
     * @deprecated 2013-10-10
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
     * @deprecated 2012-12-13 - use 'start([when])' instead
     * @param {finite} when
     * @return {void}
     */
    noteOn(when = 0) {
      if (!(this._.startTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteOn' on 'OscillatorNode':
          Cannot call start more than once.
        `));
      }
      start.call(this, when);
    }

    /**
     * @deprecated 2012-12-13 - use 'stop([when])' instead
     * @param {finite} when
     * @return {void}
     */
    noteOff(when = 0) {
      if (!(this._.startTime !== Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteOff' on 'OscillatorNode':
          Cannot call stop without calling start first.
        `));
      }
      if (!(this._.stopTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteOff' on 'OscillatorNode':
          Cannot call stop more than once.
        `));
      }
      stop.call(this, when);
    }

    /**
     * @deprecated 2013-10-10 - use 'setPeriodicWave(periodicWave)' instead
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
