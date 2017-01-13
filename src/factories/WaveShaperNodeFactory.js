"use strict";

function create(api, AudioNode) {
  class WaveShaperNode extends AudioNode {
    get curve() {
      void(this);
    }

    set curve(value) {
      void(this, value);
    }

    get oversample() {
      void(this);
    }

    set oversample(value) {
      void(this, value);
    }
  }
  return WaveShaperNode;
}

module.exports = { create };
