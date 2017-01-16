"use strict";

const lock = require("../utils/lock");

function create(api, AudioNode) {
  class AudioSourceNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     * @param {Object} [config]
     */
    constructor(context, opts = {}, config = {}) {
      try { lock.unlock();
        super(context, opts, config);
      } finally { lock.lock(); }

      this._.className = "AudioSourceNode";
    }
  }
  return AudioSourceNode;
}

module.exports = { create };
