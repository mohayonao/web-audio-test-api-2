"use strict";

function create(api, AudioNode) {
  class AudioDestinationNode extends AudioNode {
    get maxChannelCount() {
      void(this);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get numberOfChannels() {
      void(this);
    }
  }
  return AudioDestinationNode;
}

module.exports = { create };
