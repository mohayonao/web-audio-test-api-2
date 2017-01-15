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
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioBufferSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      const buffer = defaults(opts.buffer, null);
      const playbackRate = defaults(opts.playbackRate, DEFAULT_PLAYBACK_RATE);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const loop = defaults(opts.loop, DEFAULT_LOOP);
      const loopStart = defaults(opts.loopStart, DEFAULT_LOOP_START);
      const loopEnd = defaults(opts.loopEnd, DEFAULT_LOOP_END);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      if (!(this instanceof api.AudioScheduledSourceNode)) {
        initialize.call(this, api, opts);
      }
      lock.lock();

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

    get buffer() {
      return this._.buffer;
    }

    set buffer(value) {
      this._.buffer = value;
    }

    get playbackRate() {
      return this._.playbackRate;
    }

    get detune() {
      return this._.detune;
    }

    get loop() {
      return this._.loop;
    }

    set loop(value) {
      this._.loop = value;
    }

    get loopStart() {
      return this._.loopStart;
    }

    set loopStart(value) {
      this._.loopStart = value;
    }

    get loopEnd() {
      return this._.loopEnd;
    }

    set loopEnd(value) {
      this._.loopEnd = value;
    }

    start(when = 0, offset = 0, duration = Infinity) {
      start.call(this, when, offset, duration);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

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

    get gain() {
      return this._.gain;
    }

    get looping() {
      return this._.loop;
    }

    set looping(value) {
      this._.loop = value;
    }

    noteOn(when) {
      start.call(this, when, 0, Infinity);
    }

    noteGrainOn(when, grainOffset, grainDuration) {
      start.call(this, when, grainOffset, grainDuration);
    }

    noteOff(when) {
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
