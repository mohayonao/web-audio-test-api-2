"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamAudioSourceNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createMediaStreamSource(mediaStream)' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {MediaStream} opts.mediaStream
     */
    constructor(context, opts = {}) {
      const mediaStream = defaults(opts.mediaStream, null);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        this._.className = "MediaStreamAudioSourceNode";
      } finally { lock.lock(); }

      this._.mediaStream = mediaStream;
    }

    /**
     * @type {MediaStream}
     */
    get mediaStream() {
      return this._.mediaStream;
    }
  }
  return MediaStreamAudioSourceNode;
}

module.exports = { create };
