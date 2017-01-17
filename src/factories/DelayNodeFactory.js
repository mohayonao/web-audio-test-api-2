"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_MAX_DELAY_TIME = 1;
const DEFAULT_DELAY_TIME = 0;

function create(api, AudioNode) {
  class DelayNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.maxDelayTime
     * @param {number} opts.delayTime
     */
    constructor(context, opts = {}) {
      const maxDelayTime = defaults(opts.maxDelayTime, DEFAULT_MAX_DELAY_TIME);
      const delayTime = defaults(opts.delayTime, DEFAULT_DELAY_TIME);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
        this._.className = "DelayNode";
      } finally { lock.lock(); }

      this._.maxDelayTime = maxDelayTime;
      this._.delayTime = new api.AudioParam(context, {
        name: "delayTime", defaultValue: DEFAULT_DELAY_TIME, value: delayTime,
        minValue: 0, maxValue: maxDelayTime
      });
    }

    /**
     * @type {AudioParam}
     */
    get delayTime() {
      return this._.delayTime;
    }
  }
  return DelayNode;
}

module.exports = { create };
