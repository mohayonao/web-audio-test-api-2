"use strict";

function create(api, AudioNode) {
  class MediaStreamTrackAudioSourceNode extends AudioNode {
  }
  return MediaStreamTrackAudioSourceNode;
}

module.exports = { create };
