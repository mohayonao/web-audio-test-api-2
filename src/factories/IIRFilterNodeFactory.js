"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class IIRFilterNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number[]} opts.feedforward
     * @param {number[]} opts.feedback
     */
    constructor(context, opts = {}) {
      const feedforward = defaults(opts.feedforward, null);
      const feedback = defaults(opts.feedback, null);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
        this._.className = "IIRFilterNode";
      } finally { lock.lock(); }

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
      if (!(frequencyHz.length === magResponse.length && frequencyHz.length === phaseResponse.length)) {
        throw new TypeError(format(`
          Failed to execute 'getFrequencyResponse' on 'IIRFilterNode':
          The three parameters must be the same length, but got (${ frequencyHz.length }, ${ magResponse.length }, ${ phaseResponse.length }).
        `));
      }
    }
  }
  return IIRFilterNode;
}

module.exports = { create };
