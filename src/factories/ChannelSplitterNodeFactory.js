"use strict";

function create(api, AudioNode) {
  class ChannelSplitterNode extends AudioNode {
  }
  return ChannelSplitterNode;
}

module.exports = { create };
