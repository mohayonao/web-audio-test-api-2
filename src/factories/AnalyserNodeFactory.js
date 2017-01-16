"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_FFT_SIZE = 2048;
const DEFAULT_MIN_DECIBELS = -100;
const DEFAULT_MAX_DECIBELS = -30;
const DEFAULT_SMOOTHING_TIME_CONSTANT = 0.8;

function create(api, AudioNode) {
  class AnalyserNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} opts
     */
    constructor(context, opts = {}) {
      /** @type {number} */
      const fftSize = defaults(opts.fftSize, DEFAULT_FFT_SIZE);
      /** @type {number} */
      const minDecibels = defaults(opts.minDecibels, DEFAULT_MIN_DECIBELS);
      /** @type {number} */
      const maxDecibels = defaults(opts.maxDecibels, DEFAULT_MAX_DECIBELS);
      /** @type {number} */
      const smoothingTimeConstant = defaults(opts.smoothingTimeConstant, DEFAULT_SMOOTHING_TIME_CONSTANT);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 1,
          channelCountMode: ChannelCountMode.MAX,
        });
      } finally { lock.lock(); }

      this._.className = "AnalyserNode";
      this._.fftSize = fftSize;
      this._.minDecibels = minDecibels;
      this._.maxDecibels = maxDecibels;
      this._.smoothingTimeConstant = smoothingTimeConstant;
    }

    /**
     * @type {number}
     */
    get fftSize() {
      return this._.fftSize;
    }

    set fftSize(value) {
      this._.fftSize = value;
    }

    /**
     * @type {number}
     */
    get frequencyBinCount() {
      return this._.fftSize / 2;
    }

    /**
     * @type {number}
     */
    get maxDecibels() {
      return this._.maxDecibels;
    }

    set maxDecibels(value) {
      this._.maxDecibels = value;
    }

    /**
     * @type {number}
     */
    get minDecibels() {
      return this._.minDecibels;
    }

    set minDecibels(value) {
      this._.minDecibels = value;
    }

    /**
     * @type {number}
     */
    get smoothingTimeConstant() {
      return this._.smoothingTimeConstant;
    }

    set smoothingTimeConstant(value) {
      this._.smoothingTimeConstant = value;
    }

    /**
     * @param {Uint8Array} array
     * @return {void}
     */
    getByteFrequencyData(array) {
      void(this, array);
    }

    /**
     * @param {Uint8Array} array
     * @return {void}
     */
    getByteTimeDomainData(array) {
      void(this, array);
    }

    /**
     * @param {Float32Array} array
     * @return {void}
     */
    getFloatFrequencyData(array) {
      void(this, array);
    }

    /**
     * @param {Float32Array} array
     * @return {void}
     */
    getFloatTimeDomainData(array) {
      void(this, array);
    }
  }
  return AnalyserNode;
}

module.exports = { create };
