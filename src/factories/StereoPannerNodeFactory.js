"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_PAN = 0;

function create(api, AudioNode) {
  class StereoPannerNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createStereoPanner()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.pan
     */
    constructor(context, opts = {}) {
      const pan = defaults(opts.pan, DEFAULT_PAN);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 2 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.CLAMPED_MAX,
          allowedMaxChannelCount: 2,
          allowedChannelCountMode: [ ChannelCountMode.CLAMPED_MAX, ChannelCountMode.EXPLICIT ],
        });
        this._.className = "StereoPannerNode";
      } finally { lock.lock(); }

      this._.pan = new api.AudioParam(context, {
        name: "StereoPanner.pan", defaultValue: DEFAULT_PAN, value: pan,
        minValue: -1, maxValue: 1
      });
    }

    /**
     * @type {AudioParam}
     */
    get pan() {
      return this._.pan;
    }
  }
  return StereoPannerNode;
}

module.exports = { create };
