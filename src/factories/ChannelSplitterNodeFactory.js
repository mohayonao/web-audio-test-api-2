"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_OUTPUTS = 6;

function create(api, AudioNode) {
  class ChannelSplitterNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createChannelSplitter([numberOfOutputs])' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {integer} opts.numberOfOutputs
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
        this._.className = "ChannelSplitterNode";
      } finally { lock.lock(); }

      if (!(1 <= numberOfOutputs && numberOfOutputs <= 32)) {
        throw new TypeError(format(`
          Failed to construct 'ChannelSplitterNode':
          The number of outputs must be in the range [1, 32], but got ${ numberOfOutputs }.
        `));
      }
    }
  }
  return ChannelSplitterNode;
}

module.exports = { create };
