"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const OverSampleType = require("../types/OverSampleType");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_OVERSAMPLE = OverSampleType.NONE;

function create(api, AudioNode) {
  class WaveShaperNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/WaveShaperNode")) {
        throw new TypeError("Illegal constructor");
      }

      const curve = defaults(opts.curve, null);
      const oversample = defaults(opts.oversample, DEFAULT_OVERSAMPLE);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 1 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.MAX,
      });
      lock.lock();

      this._.className = "WaveShaperNode";
      this._.curve = curve;
      this._.oversample = oversample;
    }

    get curve() {
      return this._.curve;
    }

    set curve(value) {
      this._.curve = value;
    }

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
