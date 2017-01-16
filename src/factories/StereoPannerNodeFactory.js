"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_PAN = 0;

function create(api, AudioNode) {
  class StereoPannerNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/StereoPannerNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {number} */
      const pan = defaults(opts.pan, DEFAULT_PAN);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 2 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.CLAMPED_MAX,
        allowedMaxChannelCount: 2,
        allowedChannelCountMode: [ ChannelCountMode.CLAMPED_MAX, ChannelCountMode.EXPLICIT ],
      });
      lock.lock();

      this._.className = "StereoPannerNode";
      this._.pan = new api.AudioParam(context, {
        name: "pan", defaultValue: DEFAULT_PAN, value: pan,
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
