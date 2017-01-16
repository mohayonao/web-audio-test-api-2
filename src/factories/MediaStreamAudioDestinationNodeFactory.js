"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamAudioDestinationNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts, {
          inputs: [ 2 ],
          outputs: [],
          channelCount: 2,
          channelCountMode: ChannelCountMode.EXPLICIT,
          allowedChannelCountMode: [ ChannelCountMode.EXPLICIT ],
        });
      } finally { lock.lock(); }

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
