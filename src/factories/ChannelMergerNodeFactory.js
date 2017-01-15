"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_INPUTS = 6;

function create(api, AudioNode) {
  class ChannelMergerNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/ChannelMergerNode")) {
        throw new TypeError("Illegal constructor");
      }

      const numberOfInputs = defaults(opts.numberOfInputs, DEFAULT_NUMBER_OF_INPUTS);

      lock.unlock();
      super(context, opts, {
        inputs: Array.from({ length: numberOfInputs}, () => 1),
        outputs: [ numberOfInputs ],
        channelCount: 1,
        channelCountMode: ChannelCountMode.EXPLICIT,
        allowedMaxChannelCount: 1,
        allowedChannelCountMode: [ ChannelCountMode.EXPLICIT ],
      });
      lock.lock();

      this._.className = "ChannelMergerNode";
    }
  }
  return ChannelMergerNode;
}

module.exports = { create };
