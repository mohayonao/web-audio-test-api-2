"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamAudioDestinationNode extends AudioNode {
    /**
     * @protected - audioContext.createMediaStreamDestination()
     * @param {BaseAudioContext} context
     * @param {object} opts
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
        this._.className = "MediaStreamAudioDestinationNode";
      } finally { lock.lock(); }

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
