"use strict";

function create(api, AudioNode) {
  class AudioWorkerNode extends AudioNode {
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
