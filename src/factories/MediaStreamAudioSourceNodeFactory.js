"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class MediaStreamAudioSourceNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/MediaStreamAudioSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {MediaStream} */
      const mediaStream = defaults(opts.mediaStream, null);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      lock.lock();

      this._.className = "MediaStreamAudioSourceNode";
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
