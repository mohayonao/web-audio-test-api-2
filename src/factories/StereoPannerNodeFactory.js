"use strict";

function create(api, AudioNode) {
  class StereoPannerNode extends AudioNode {
    get pan() {
      void(this);
    }
  }
  return StereoPannerNode;
}

module.exports = { create };
