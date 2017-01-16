"use strict";

const lock = require("../utils/lock");

/* istanbul ignore next */
function create(api, AudioNode) {
  class AudioWorkerNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts);
      } finally { lock.lock(); }

      this._.className = "AudioWorkerNode";
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
