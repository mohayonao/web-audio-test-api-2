"use strict";

function create(api, AudioNode) {
  class GainNode extends AudioNode {
    get gain() {
      void(this);
    }
  }
  return GainNode;
}

module.exports = { create };
