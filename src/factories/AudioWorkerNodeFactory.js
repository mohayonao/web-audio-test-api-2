"use strict";

const lock = require("../utils/lock");

/* istanbul ignore next */
function create(api, AudioNode) {
  class AudioWorkerNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts);
        this._.className = "AudioWorkerNode";
      } finally { lock.lock(); }
    }

    get onmessage() {
      void(this);
    }

    set onmessage(value) {
      void(this, value);
    }

    postMessage(message, transfer) {
      void(this, message, transfer);
    }
  }
  return AudioWorkerNode;
}

module.exports = { create };
