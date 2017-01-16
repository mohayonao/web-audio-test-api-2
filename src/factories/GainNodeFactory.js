"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_GAIN = 1;

function create(api, AudioNode) {
  class GainNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      /** @type {number} */
      const gain = defaults(opts.gain, DEFAULT_GAIN);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
      } finally { lock.lock(); }

      this._.className = "GainNode";
      this._.gain = new api.AudioParam(context, {
        name: "gain", defaultValue: DEFAULT_GAIN, value: gain
      });
    }

    /**
     * @type {AudioParam}
     */
    get gain() {
      return this._.gain;
    }
  }
  return GainNode;
}

module.exports = { create };
