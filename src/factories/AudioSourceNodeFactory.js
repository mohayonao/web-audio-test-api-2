"use strict";

const lock = require("../utils/lock");

function create(api, AudioNode) {
  class AudioSourceNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {object} config
     */
    constructor(context, opts = {}, config = {}) {
      try { lock.unlock();
        super(context, opts, config);
        this._.className = "AudioSourceNode";
      } finally { lock.lock(); }
    }
  }
  return AudioSourceNode;
}

module.exports = { create };
