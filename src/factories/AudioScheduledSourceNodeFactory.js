"use strict";

function create(api, AudioNode) {
  class AudioScheduledSourceNode extends AudioNode {
    get onended() {
      void(this);
    }

    set onended(value) {
      void(this, value);
    }

    start(when = 0) {
      void(this, when);
    }

    stop(when = 0) {
      void(this, when);
    }
  }
  return AudioScheduledSourceNode;
}

module.exports = { create };
