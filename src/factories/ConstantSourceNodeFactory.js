"use strict";

function create(api, AudioScheduledSourceNode) {
  class ConstantSourceNode extends AudioScheduledSourceNode {
    get offset() {
      void(this);
    }
  }
  return ConstantSourceNode;
}

module.exports = { create };
