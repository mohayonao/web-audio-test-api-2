"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_INPUTS = 6;

function create(api, AudioNode) {
  class ChannelMergerNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.numberOfInputs
     */
    constructor(context, opts = {}) {
      const numberOfInputs = defaults(opts.numberOfInputs, DEFAULT_NUMBER_OF_INPUTS);

      try { lock.unlock();
        super(context, opts, {
          inputs: Array.from({ length: numberOfInputs}, () => 1),
          outputs: [ numberOfInputs ],
          channelCount: 1,
          channelCountMode: ChannelCountMode.EXPLICIT,
          allowedMaxChannelCount: 1,
          allowedChannelCountMode: [ ChannelCountMode.EXPLICIT ],
        });
        this._.className = "ChannelMergerNode";
      } finally { lock.lock(); }
    }
  }
  return ChannelMergerNode;
}

module.exports = { create };
