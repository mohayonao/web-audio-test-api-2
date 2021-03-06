"use strict";

const defaults = require("../utils/defaults");
const format = require("../utils/format");
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
     * @protected - use 'audioContext.createBufferSource()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {AudioBuffer?} opts.buffer
     * @param {finite} opts.playbackRate
     * @param {finite} opts.detune
     * @param {boolean} opts.loop
     * @param {positive} opts.loopStart
     * @param {positive} opts.loopEnd
     */
    constructor(context, opts = {}) {
      const buffer = defaults(opts.buffer, null);
      const playbackRate = defaults(opts.playbackRate, DEFAULT_PLAYBACK_RATE);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const loop = defaults(opts.loop, DEFAULT_LOOP);
      const loopStart = defaults(opts.loopStart, DEFAULT_LOOP_START);
      const loopEnd = defaults(opts.loopEnd, DEFAULT_LOOP_END);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        this._.className = "AudioBufferSourceNode";
        if (!(this instanceof api.AudioScheduledSourceNode)) {
          initialize.call(this, api, opts);
        }
      } finally { lock.lock(); }

      this._.buffer = buffer;
      this._.playbackRate = new api.AudioParam(context, {
        name: "BufferSource.playbackRate", defaultValue: DEFAULT_PLAYBACK_RATE, value: playbackRate
      });
      this._.detune = new api.AudioParam(context, {
        name: "BufferSource.detune", defaultValue: DEFAULT_DETUNE, value: detune
      });
      this._.gain = new api.AudioParam(context, {
        name: "BufferSource.gain", defaultValue: 1
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
      if (!(this._.buffer === null)) {
        throw new TypeError(format(`
          Failed to set the 'buffer' property on 'AudioBufferSourceNode':
          Cannot set buffer after it has been already been set.
        `));
      }
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
     * @type {positive}
     */
    get loopStart() {
      return this._.loopStart;
    }

    set loopStart(value) {
      this._.loopStart = value;
    }

    /**
     * @type {positive}
     */
    get loopEnd() {
      return this._.loopEnd;
    }

    set loopEnd(value) {
      this._.loopEnd = value;
    }

    /**
     * @param {positive} when
     * @param {positive} offset
     * @param {positive} duration
     * @return {void}
     */
    start(when = 0, offset = 0, duration = Number.MAX_VALUE) {
      if (!(this._.startTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'start' on 'AudioBufferSourceNode':
          Cannot call start more than once.
        `));
      }
      start.call(this, when, offset, duration);
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
     * @deprecated 2012-08-02
     * @type {AudioParam}
     */
    get gain() {
      return this._.gain;
    }

    /**
     * @deprecated 2011-12-15 - use 'loop' instead
     * @type {boolean}
     */
    get looping() {
      return this._.loop;
    }

    set looping(value) {
      this._.loop = value;
    }

    /**
     * @deprecated 2012-12-02 - use 'start([when, offset, duration])' instead
     * @param {positive} when
     * @return {void}
     */
    noteOn(when = 0) {
      if (!(this._.startTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteOn' on 'AudioBufferSourceNode':
          Cannot call start more than once.
        `));
      }
      start.call(this, when, 0, Infinity);
    }

    /**
     * @deprecated 2012-12-02 - use 'start([when, offset, duration])' instead
     * @param {positive} when
     * @param {positive} grainOffset
     * @param {positive} grainDuration
     * @return {void}
     */
    noteGrainOn(when = 0, grainOffset = 0, grainDuration = 0) {
      if (!(this._.startTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteGrainOn' on 'AudioBufferSourceNode':
          Cannot call start more than once.
        `));
      }
      start.call(this, when, grainOffset, grainDuration);
    }

    /**
     * @deprecated 2012-12-02 - use 'stop([when])' instead
     * @param {positive} when
     * @return {void}
     */
    noteOff(when = 0) {
      if (!(this._.startTime !== Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteOff' on 'AudioBufferSourceNode':
          Cannot call stop without calling start first.
        `));
      }
      if (!(this._.stopTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'noteOff' on 'AudioBufferSourceNode':
          Cannot call stop more than once.
        `));
      }
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
