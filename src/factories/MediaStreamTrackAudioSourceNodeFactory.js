"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamTrackAudioSourceNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      /** @type {AudioMediaStreamTrack} */
      const mediaStreamTrack = defaults(opts.mediaStreamTrack, null);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
      } finally { lock.lock(); }

      this._.className = "MediaStreamTrackAudioSourceNode";
      this._.mediaStreamTrack = mediaStreamTrack;
    }
  }
  return MediaStreamTrackAudioSourceNode;
}

module.exports = { create };
