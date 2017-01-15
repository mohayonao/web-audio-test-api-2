"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 2;

function create(api, AudioNode) {
  class AudioDestinationNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioDestinationNode")) {
        throw new TypeError("Illegal constructor");
      }

      const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);

      lock.unlock();
      super(context, opts, {
        inputs: [ numberOfChannels ],
        outputs: [],
        channelCount: numberOfChannels,
        channelCountMode: ChannelCountMode.EXPLICIT,
        allowedMaxChannelCount: numberOfChannels,
      });
      lock.lock();

      this._.className = "AudioDestinationNode";
      this._.maxChannelCount = numberOfChannels;
    }

    get maxChannelCount() {
      return this._.maxChannelCount;
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get numberOfChannels() {
      return this._.maxChannelCount;
    }
  }
  return AudioDestinationNode;
}

module.exports = { create };
