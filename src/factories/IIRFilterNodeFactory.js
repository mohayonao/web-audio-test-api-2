"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class IIRFilterNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/IIRFilterNode")) {
        throw new TypeError("Illegal constructor");
      }

      const feedforward = defaults(opts.feedforward, null);
      const feedback = defaults(opts.feedback, null);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 1 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.MAX,
      });
      lock.lock();

      this._.className = "IIRFilterNode";
      this._.feedforward = feedforward;
      this._.feedback = feedback;
    }

    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      void(this, frequencyHz, magResponse, phaseResponse);
    }
  }
  return IIRFilterNode;
}

module.exports = { create };
