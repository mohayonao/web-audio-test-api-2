"use strict";

function create(api, AudioNode) {
  class ChannelMergerNode extends AudioNode {
  }
  return ChannelMergerNode;
}

module.exports = { create };
