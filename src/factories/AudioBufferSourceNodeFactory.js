"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");
const { initialize, stop } = require("./AudioScheduledSourceNodeFactory");

const DEFAULT_PLAYBACK_RATE = 1;
const DEFAULT_DETUNE = 0;
const DEFAULT_LOOP = false;
const DEFAULT_LOOP_START = 0;
const DEFAULT_LOOP_END = 0;

function create(api, AudioScheduledSourceNode) {
  class AudioBufferSourceNode extends AudioScheduledSourceNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioBufferSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {AudioBuffer?} */
      const buffer = defaults(opts.buffer, null);
      /** @type {number} */
      const playbackRate = defaults(opts.playbackRate, DEFAULT_PLAYBACK_RATE);
      /** @type {number} */
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      /** @type {boolean} */
      const loop = defaults(opts.loop, DEFAULT_LOOP);
      /** @type {number} */
      const loopStart = defaults(opts.loopStart, DEFAULT_LOOP_START);
      /** @type {number} */
      const loopEnd = defaults(opts.loopEnd, DEFAULT_LOOP_END);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        if (!(this instanceof api.AudioScheduledSourceNode)) {
          initialize.call(this, api, opts);
        }
      } finally { lock.lock(); }

      this._.className = "AudioBufferSourceNode";
      this._.buffer = buffer;
      this._.playbackRate = new api.AudioParam(context, {
        name: "playbackRate", defaultValue: DEFAULT_PLAYBACK_RATE, value: playbackRate
      });
      this._.detune = new api.AudioParam(context, {
        name: "detune", defaultValue: DEFAULT_DETUNE, value: detune
      });
      this._.gain = new api.AudioParam(context, {
        name: "gain", defaultValue: 1
      });
      this._.loop = loop;
      this._.loopStart = loopStart;
      this._.loopEnd = loopEnd;
      this._.offset = 0;
      this._.duration = 0;
    }

    /**
     * @type {AudioBuffer}
     */
    get buffer() {
      return this._.buffer;
    }

    set buffer(value) {
      this._.buffer = value;
    }

    /**
     * @type {AudioParam}
     */
    get playbackRate() {
      return this._.playbackRate;
    }

    /**
     * @type {AudioParam}
     */
    get detune() {
      return this._.detune;
    }

    /**
     * @type {boolean}
     */
    get loop() {
      return this._.loop;
    }

    set loop(value) {
      this._.loop = value;
    }

    /**
     * @type {number}
     */
    get loopStart() {
      return this._.loopStart;
    }

    set loopStart(value) {
      this._.loopStart = value;
    }

    /**
     * @type {number}
     */
    get loopEnd() {
      return this._.loopEnd;
    }

    set loopEnd(value) {
      this._.loopEnd = value;
    }

    /**
     * @param {number} [when]
     * @param {number} [offset]
     * @param {number} [duration]
     * @return {void}
     */
    start(when = 0, offset = 0, duration = Infinity) {
      start.call(this, when, offset, duration);
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
     * @type {AudioParam}
     */
    get gain() {
      return this._.gain;
    }

    /**
     * @deprecated
     * @type {boolean}
     */
    get looping() {
      return this._.loop;
    }

    set looping(value) {
      this._.loop = value;
    }

    /**
     * @deprecated
     * @param {number} [when]
     * @return {void}
     */
    noteOn(when = 0) {
      start.call(this, when, 0, Infinity);
    }

    /**
     * @deprecated
     * @param {number} [when]
     * @param {number} [grainOffset]
     * @param {number} [grainDuration]
     * @return {void}
     */
    noteGrainOn(when = 0, grainOffset = 0, grainDuration = 0) {
      start.call(this, when, grainOffset, grainDuration);
    }

    /**
     * @deprecated
     * @param {number} [when]
     * @return {void}
     */
    noteOff(when = 0) {
      stop.call(this, when);
    }
  }
  return AudioBufferSourceNode;
}

function start(when, offset, duration) {
  this._.startTime = when;
  this._.offset = offset;
  this._.duration = duration;
}

module.exports = { create };
