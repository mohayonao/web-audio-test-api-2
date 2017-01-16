"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamAudioDestinationNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/MediaStreamAudioDestinationNode")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts, {
        inputs: [ 2 ],
        outputs: [],
        channelCount: 2,
        channelCountMode: ChannelCountMode.EXPLICIT,
        allowedChannelCountMode: [ ChannelCountMode.EXPLICIT ],
      });
      lock.lock();

      this._.className = "MediaStreamAudioDestinationNode";
      this._.stream = new api.MediaStream();
    }

    /**
     * @type {MediaStream}
     */
    get stream() {
      return this._.stream;
    }
  }
  return MediaStreamAudioDestinationNode;
}

module.exports = { create };
