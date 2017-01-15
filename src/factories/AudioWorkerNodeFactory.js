"use strict";

const lock = require("../utils/lock");

function create(api, AudioNode) {
  class AudioWorkerNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioWorkerNode")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts);
      lock.lock();

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
