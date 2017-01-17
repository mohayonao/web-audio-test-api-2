"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_OUTPUTS = 6;

function create(api, AudioNode) {
  class ChannelSplitterNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.numberOfOutputs
     */
    constructor(context, opts = {}) {
      const numberOfOutputs = defaults(opts.numberOfOutputs, DEFAULT_NUMBER_OF_OUTPUTS);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: Array.from({ length: numberOfOutputs }, () => 1),
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
      } finally { lock.lock(); }

      this._.className = "ChannelSplitterNode";
    }
  }
  return ChannelSplitterNode;
}

module.exports = { create };
