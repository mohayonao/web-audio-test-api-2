"use strict";

function create(api, AudioNode) {
  class MediaStreamAudioDestinationNode extends AudioNode {
    get stream() {
      void(this);
    }
  }
  return MediaStreamAudioDestinationNode;
}

module.exports = { create };
