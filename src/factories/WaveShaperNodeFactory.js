"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const OverSampleType = require("../types/OverSampleType");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_OVERSAMPLE = OverSampleType.NONE;

function create(api, AudioNode) {
  class WaveShaperNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createWaveShaper()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {Float32Array?} opts.curve
     * @param {OverSampleType} opts.oversample
     */
    constructor(context, opts = {}) {
      const curve = defaults(opts.curve, null);
      const oversample = defaults(opts.oversample, DEFAULT_OVERSAMPLE);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
        this._.className = "WaveShaperNode";
      } finally { lock.lock(); }

      this._.curve = curve;
      this._.oversample = oversample;
    }

    /**
     * @type {Float32Array?}
     */
    get curve() {
      return this._.curve;
    }

    set curve(value) {
      this._.curve = value;
    }

    /**
     * @type {OverSampleType}
     */
    get oversample() {
      return this._.oversample;
    }

    set oversample(value) {
      this._.oversample = value;
    }
  }
  return WaveShaperNode;
}

module.exports = { create };
