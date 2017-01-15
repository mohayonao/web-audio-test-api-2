"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaElementAudioSourceNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/MediaElementAudioSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      const mediaElement = defaults(opts.mediaElement, null);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      lock.lock();

      this._.className = "MediaElementAudioSourceNode";
      this._.mediaElement = mediaElement;
    }

    get mediaElement() {
      return this._.mediaElement;
    }
  }
  return MediaElementAudioSourceNode;
}

module.exports = { create };
