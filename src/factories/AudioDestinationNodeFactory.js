"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 2;

function create(api, AudioNode) {
  class AudioDestinationNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {integer} opts.numberOfChannels
     */
    constructor(context, opts = {}) {
      const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ numberOfChannels ],
          outputs: [],
          channelCount: numberOfChannels,
          channelCountMode: ChannelCountMode.EXPLICIT,
          allowedMaxChannelCount: numberOfChannels,
        });
        this._.className = "AudioDestinationNode";
      } finally { lock.lock(); }

      this._.maxChannelCount = numberOfChannels;
    }

    /**
     * @type {integer}
     */
    get maxChannelCount() {
      return this._.maxChannelCount;
    }

    /**
     * @deprecated
     * @type {integer}
     */
    get numberOfChannels() {
      return this._.maxChannelCount;
    }
  }
  return AudioDestinationNode;
}

module.exports = { create };
