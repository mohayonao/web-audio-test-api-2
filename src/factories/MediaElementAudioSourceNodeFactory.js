"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaElementAudioSourceNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/MediaElementAudioSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {HTMLMediaElement} */
      const mediaElement = defaults(opts.mediaElement, null);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      lock.lock();

      this._.className = "MediaElementAudioSourceNode";
      this._.mediaElement = mediaElement;
    }

    /**
     * @type {HTMLMediaElement}
     */
    get mediaElement() {
      return this._.mediaElement;
    }
  }
  return MediaElementAudioSourceNode;
}

module.exports = { create };
