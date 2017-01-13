"use strict";

function create(api, AudioNode) {
  class MediaElementAudioSourceNode extends AudioNode {
    get mediaElement() {
      void(this);
    }
  }
  return MediaElementAudioSourceNode;
}

module.exports = { create };
