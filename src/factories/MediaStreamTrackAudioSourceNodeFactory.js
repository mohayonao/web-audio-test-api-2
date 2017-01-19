"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamTrackAudioSourceNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createMediaStreamTrackSource(mediaStreamTrack)' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {AudioMediaStreamTrack} opts.mediaStreamTrack
     */
    constructor(context, opts = {}) {
      const mediaStreamTrack = defaults(opts.mediaStreamTrack, null);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        this._.className = "MediaStreamTrackAudioSourceNode";
      } finally { lock.lock(); }

      this._.mediaStreamTrack = mediaStreamTrack;
    }
  }
  return MediaStreamTrackAudioSourceNode;
}

module.exports = { create };
