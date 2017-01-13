"use strict";

function create(api, AudioNode) {
  class ScriptProcessorNode extends AudioNode {
    get bufferSize() {
      void(this);
    }

    get onaudioprocess() {
      void(this);
    }

    set onaudioprocess(value) {
      void(this, value);
    }
  }
  return ScriptProcessorNode;
}

module.exports = { create };
