"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_GAIN = 1;

function create(api, AudioNode) {
  class GainNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/GainNode")) {
        throw new TypeError("Illegal constructor");
      }

      const gain = defaults(opts.gain, DEFAULT_GAIN);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 1 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.MAX,
      });
      lock.lock();

      this._.className = "GainNode";
      this._.gain = new api.AudioParam(context, {
        name: "gain", defaultValue: DEFAULT_GAIN, value: gain
      });
    }

    get gain() {
      return this._.gain;
    }
  }
  return GainNode;
}

module.exports = { create };
