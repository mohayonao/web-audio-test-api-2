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
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AnalyserNode")) {
        throw new TypeError("Illegal constructor");
      }

      const fftSize = defaults(opts.fftSize, DEFAULT_FFT_SIZE);
      const minDecibels = defaults(opts.minDecibels, DEFAULT_MIN_DECIBELS);
      const maxDecibels = defaults(opts.maxDecibels, DEFAULT_MAX_DECIBELS);
      const smoothingTimeConstant = defaults(opts.smoothingTimeConstant, DEFAULT_SMOOTHING_TIME_CONSTANT);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 1 ],
        channelCount: 1,
        channelCountMode: ChannelCountMode.MAX,
      });
      lock.lock();

      this._.className = "AnalyserNode";
      this._.fftSize = fftSize;
      this._.minDecibels = minDecibels;
      this._.maxDecibels = maxDecibels;
      this._.smoothingTimeConstant = smoothingTimeConstant;
    }

    get fftSize() {
      return this._.fftSize;
    }

    set fftSize(value) {
      this._.fftSize = value;
    }

    get frequencyBinCount() {
      return this._.fftSize / 2;
    }

    get maxDecibels() {
      return this._.maxDecibels;
    }

    set maxDecibels(value) {
      this._.maxDecibels = value;
    }

    get minDecibels() {
      return this._.minDecibels;
    }

    set minDecibels(value) {
      this._.minDecibels = value;
    }

    get smoothingTimeConstant() {
      return this._.smoothingTimeConstant;
    }

    set smoothingTimeConstant(value) {
      this._.smoothingTimeConstant = value;
    }

    getByteFrequencyData(array) {
      void(this, array);
    }

    getByteTimeDomainData(array) {
      void(this, array);
    }

    getFloatFrequencyData(array) {
      void(this, array);
    }

    getFloatTimeDomainData(array) {
      void(this, array);
    }
  }
  return AnalyserNode;
}

module.exports = { create };
