"use strict";

function create(api, AudioNode) {
  class DelayNode extends AudioNode {
    get delayTime() {
      void(this);
    }
  }
  return DelayNode;
}

module.exports = { create };
