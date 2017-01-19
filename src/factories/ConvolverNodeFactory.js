"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_DISABLE_NORMALIZATION = false;

function create(api, AudioNode) {
  class ConvolverNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createConvolver()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {AudioBuffer?} opts.buffer
     * @param {boolean} opts.disableNormalization
     */
    constructor(context, opts = {}) {
      const buffer = defaults(opts.buffer, null);
      const disableNormalization = defaults(opts.disableNormalization, DEFAULT_DISABLE_NORMALIZATION);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.CLAMPED_MAX,
          allowedMaxChannelCount: 2,
          allowedChannelCountMode: [ ChannelCountMode.CLAMPED_MAX, ChannelCountMode.EXPLICIT ],
        });
        this._.className = "ConvolverNode";
      } finally { lock.lock(); }

      this._.buffer = buffer;
      this._.normalize = !disableNormalization;
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
     * @type {boolean}
     */
    get normalize() {
      return this._.normalize;
    }

    set normalize(value) {
      this._.normalize = value;
    }
  }
  return ConvolverNode;
}

module.exports = { create };
