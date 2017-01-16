"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class IIRFilterNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      /** @type {number[]} */
      const feedforward = defaults(opts.feedforward, null);
      /** @type {number[]} */
      const feedback = defaults(opts.feedback, null);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
      } finally { lock.lock(); }

      this._.className = "IIRFilterNode";
      this._.feedforward = feedforward;
      this._.feedback = feedback;
    }

    /**
     * @param {Float32Array} frequencyHz
     * @param {Float32Array} magResponse
     * @param {Float32Array} phaseResponse
     * @return {void}
     */
    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      void(this, frequencyHz, magResponse, phaseResponse);
    }
  }
  return IIRFilterNode;
}

module.exports = { create };
