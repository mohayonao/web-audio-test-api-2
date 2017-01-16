"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_OUTPUTS = 6;

function create(api, AudioNode) {
  class ChannelSplitterNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/ChannelSplitterNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {number} */
      const numberOfOutputs = defaults(opts.numberOfOutputs, DEFAULT_NUMBER_OF_OUTPUTS);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: Array.from({ length: numberOfOutputs }, () => 1),
        channelCount: 2,
        channelCountMode: ChannelCountMode.MAX,
      });
      lock.lock();

      this._.className = "ChannelSplitterNode";
    }
  }
  return ChannelSplitterNode;
}

module.exports = { create };
