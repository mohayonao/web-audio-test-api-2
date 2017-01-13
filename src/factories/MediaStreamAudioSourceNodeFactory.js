"use strict";

function create(api, AudioNode) {
  class MediaStreamAudioSourceNode extends AudioNode {
    get mediaStream() {
      void(this);
    }
  }
  return MediaStreamAudioSourceNode;
}

module.exports = { create };
