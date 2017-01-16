"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 1;

function create(api, BaseObject) {
  class AudioBuffer extends BaseObject {
    /**
     * @param {Object} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioBuffer")) {
        throw new TypeError("Illegal constructor");
      }

      if (lock.isLocked() && api.get("/AudioBuffer/context")) {
        void(context);
      } else {
        opts = context || /* istanbul ignore next */ {};
      }

      /** @type {number} */
      const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);
      /** @type {number} */
      const length = defaults(opts.length, 0);
      /** @type {number} */
      const sampleRate = defaults(opts.sampleRate, 0);

      lock.unlock();
      super();
      lock.lock();

      this._.className = "AudioBuffer";
      this._.sampleRate = sampleRate;
      this._.length = length;
      this._.numberOfChannels = numberOfChannels;
      this._.channelData = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
      this._.gain = 1;
    }

    /**
     * @type {number}
     */
    get sampleRate() {
      return this._.sampleRate;
    }

    /**
     * @type {number}
     */
    get length() {
      return this._.length;
    }

    /**
     * @type {number}
     */
    get duration() {
      return this._.length / this._.sampleRate;
    }

    /**
     * @type {number}
     */
    get numberOfChannels() {
      return this._.numberOfChannels;
    }

    /**
     * @param {number} channel
     * @return {Float32Array}
     */
    getChannelData(channel) {
      return this._.channelData[channel|0];
    }

    /**
     * @param {Float32Array} destination
     * @param {number} channelNumber
     * @param {number} [startInChannel]
     * @return {void}
     */
    copyFromChannel(destination, channelNumber, startInChannel = 0) {
      const source = this._.channelData[channelNumber|0];

      startInChannel = startInChannel|0;

      destination.set(source.subarray(startInChannel, startInChannel + destination.length));
    }

    /**
     * @param {Float32Array} source
     * @param {number} channelNumber
     * @param {number} [startInChannel]
     * @return {void}
     */
    copyToChannel(source, channelNumber, startInChannel = 0) {
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
