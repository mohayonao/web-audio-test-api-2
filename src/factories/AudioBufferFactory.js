"use strict";

const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 1;

function create(api, BaseObject) {
  class AudioBuffer extends BaseObject {
    /**
     * @protected
     * @param {object} context
     * @param {object} opts
     * @param {integer} opts.numberOfChannels
     * @param {integer} opts.length
     * @param {positive} opts.sampleRate
     */
    constructor(context, opts = {}) {
      if (lock.isLocked() && api.get("/AudioBuffer/context")) {
        void(context);
      } else {
        opts = context || /* istanbul ignore next */ {};
      }

      const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);
      const length = defaults(opts.length, 0);
      const sampleRate = defaults(opts.sampleRate, 0);

      try { lock.unlock();
        super();
        this._.className = "AudioBuffer";
      } finally { lock.lock(); }

      if (!(1 <= numberOfChannels && numberOfChannels <= 32)) {
        throw new TypeError(format(`
          Failed to construct 'AudioBuffer':
          The number of channels must be in the range [1, 32], but got ${ numberOfChannels }.
        `));
      }
      if (!(3000 <= sampleRate && sampleRate <= 192000)) {
        throw new TypeError(format(`
          Failed to construct 'AudioBuffer':
          The sample rate must be in the range [3000, 192000], but got ${ sampleRate }.
        `));
      }

      this._.sampleRate = sampleRate;
      this._.length = length;
      this._.numberOfChannels = numberOfChannels;
      this._.channelData = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
      this._.gain = 1;
    }

    /**
     * @type {positive}
     */
    get sampleRate() {
      return this._.sampleRate;
    }

    /**
     * @type {integer}
     */
    get length() {
      return this._.length;
    }

    /**
     * @type {positive}
     */
    get duration() {
      return this._.length / this._.sampleRate;
    }

    /**
     * @type {integer}
     */
    get numberOfChannels() {
      return this._.numberOfChannels;
    }

    /**
     * @param {integer} channel
     * @return {Float32Array}
     */
    getChannelData(channel) {
      if (!(0 <= channel && channel < this._.numberOfChannels)) {
        throw new TypeError(format(`
          Failed to execute 'getChannelData' on 'AudioBuffer':
          The channel must be in the range [0, ${ this._.numberOfChannels }), but got ${ channel }.
        `));
      }
      return this._.channelData[channel|0];
    }

    /**
     * @param {Float32Array} destination
     * @param {integer} channelNumber
     * @param {integer} startInChannel
     * @return {void}
     */
    copyFromChannel(destination, channelNumber, startInChannel = 0) {
      if (!(0 <= channelNumber && channelNumber < this._.numberOfChannels)) {
        throw new TypeError(format(`
          Failed to execute 'copyFromChannel' on 'AudioBuffer':
          The channelNumber must be in the range [0, ${ this._.numberOfChannels }), but got ${ channelNumber }.
        `));
      }
      if (!(0 <= startInChannel && startInChannel < this._.length)) {
        throw new TypeError(format(`
          Failed to execute 'copyFromChannel' on 'AudioBuffer':
          The startInChannel must be in the range [0, ${ this._.length }), but got ${ startInChannel }.
        `));
      }

      const source = this._.channelData[channelNumber|0];

      startInChannel = startInChannel|0;

      destination.set(source.subarray(startInChannel, startInChannel + destination.length));
    }

    /**
     * @param {Float32Array} source
     * @param {integer} channelNumber
     * @param {integer} startInChannel
     * @return {void}
     */
    copyToChannel(source, channelNumber, startInChannel = 0) {
      if (!(0 <= channelNumber && channelNumber < this._.numberOfChannels)) {
        throw new TypeError(format(`
          Failed to execute 'copyToChannel' on 'AudioBuffer':
          The channelNumber must be in the range [0, ${ this._.numberOfChannels }), but got ${ channelNumber }.
        `));
      }
      if (!(0 <= startInChannel && startInChannel < this._.length)) {
        throw new TypeError(format(`
          Failed to execute 'copyToChannel' on 'AudioBuffer':
          The startInChannel must be in the range [0, ${ this._.length }), but got ${ startInChannel }.
        `));
      }

      const destination = this._.channelData[channelNumber|0];

      startInChannel = startInChannel|0;

      destination.set(source, startInChannel);
    }

    /**
     * @deprecated
     * @type {number}
     */
    get gain() {
      return this._.gain;
    }

    set gain(value) {
      this._.gain = value;
    }
  }
  return AudioBuffer;
}

module.exports = { create };
