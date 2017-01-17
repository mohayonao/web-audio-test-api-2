"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

const DEFAULT_FFT_SIZE = 2048;
const DEFAULT_MIN_DECIBELS = -100;
const DEFAULT_MAX_DECIBELS = -30;
const DEFAULT_SMOOTHING_TIME_CONSTANT = 0.8;

function create(api, AudioNode) {
  class AnalyserNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.fftSize
     * @param {number} opts.minDecibels
     * @param {number} opts.maxDecibels
     * @param {number} opts.smoothingTimeConstant
     */
    constructor(context, opts = {}) {
      const fftSize = defaults(opts.fftSize, DEFAULT_FFT_SIZE);
      const minDecibels = defaults(opts.minDecibels, DEFAULT_MIN_DECIBELS);
      const maxDecibels = defaults(opts.maxDecibels, DEFAULT_MAX_DECIBELS);
      const smoothingTimeConstant = defaults(opts.smoothingTimeConstant, DEFAULT_SMOOTHING_TIME_CONSTANT);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 1,
          channelCountMode: ChannelCountMode.MAX,
        });
        this._.className = "AnalyserNode";
      } finally { lock.lock(); }

      this._.fftSize = fftSize;
      this._.minDecibels = minDecibels;
      this._.maxDecibels = maxDecibels;
      this._.smoothingTimeConstant = smoothingTimeConstant;

      this.fftSize = fftSize;
      this.minDecibels = minDecibels;
      this.maxDecibels = maxDecibels;
      this.smoothingTimeConstant = smoothingTimeConstant;
    }

    /**
     * @type {number}
     */
    get fftSize() {
      return this._.fftSize;
    }

    set fftSize(value) {
      if (![ 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768 ].includes(value)) {
        throw new TypeError(format(`
          Failed to set the 'fftSize' property on 'AnalyserNode':
          The FFT size muse be a power of two in the range [ 32, 32768 ], but got ${ value }.
        `));
      }
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
      if (!(this._.minDecibels < value)) {
        throw new TypeError(format(`
          Failed to set the 'maxDecibels' property on 'AnalyserNode':
          The maxDecibels must be greater than the minDecibels (${ this._.minDecibels }), but got ${ value }.
        `));
      }
      this._.maxDecibels = value;
    }

    /**
     * @type {number}
     */
    get minDecibels() {
      return this._.minDecibels;
    }

    set minDecibels(value) {
      if (!(value < this._.maxDecibels)) {
        throw new TypeError(format(`
          Failed to set the 'minDecibels' property on 'AnalyserNode':
          The minDecibels must be less than the maxDecibels (${ this._.maxDecibels}), but got ${ value }.
        `));
      }
      this._.minDecibels = value;
    }

    /**
     * @type {number}
     */
    get smoothingTimeConstant() {
      return this._.smoothingTimeConstant;
    }

    set smoothingTimeConstant(value) {
      if (!(0 <= value && value <= 1)) {
        throw new TypeError(format(`
          Failed to set the 'smoothingTimeConstant' property on 'AnalyserNode':
          The smoothingTimeConstant must be in the range [ 0, 1 ], but got ${ value }.
        `));
      }
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
