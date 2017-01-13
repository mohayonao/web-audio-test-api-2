"use strict";

function create(api, AudioNode) {
  class AudioSourceNode extends AudioNode {
  }
  return AudioSourceNode;
}

module.exports = { create };
