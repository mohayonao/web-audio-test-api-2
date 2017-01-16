"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 2;

function create(api, AudioNode) {
  class AudioDestinationNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioDestinationNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {number} */
      const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ numberOfChannels ],
          outputs: [],
          channelCount: numberOfChannels,
          channelCountMode: ChannelCountMode.EXPLICIT,
          allowedMaxChannelCount: numberOfChannels,
        });
      } finally { lock.lock(); }

      this._.className = "AudioDestinationNode";
      this._.maxChannelCount = numberOfChannels;
    }

    /**
     * @type {number}
     */
    get maxChannelCount() {
      return this._.maxChannelCount;
    }

    /**
     * @deprecated
     * @type {number}
     */
    get numberOfChannels() {
      return this._.maxChannelCount;
    }
  }
  return AudioDestinationNode;
}

module.exports = { create };
