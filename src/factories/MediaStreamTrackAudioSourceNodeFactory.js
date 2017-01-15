"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamTrackAudioSourceNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/MediaStreamTrackAudioSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      const mediaStreamTrack = defaults(opts.mediaStreamTrack, null);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      lock.lock();

      this._.className = "MediaStreamTrackAudioSourceNode";
      this._.mediaStreamTrack = mediaStreamTrack;
    }
  }
  return MediaStreamTrackAudioSourceNode;
}

module.exports = { create };
