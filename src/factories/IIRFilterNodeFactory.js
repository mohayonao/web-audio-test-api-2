"use strict";

function create(api, AudioNode) {
  class IIRFilterNode extends AudioNode {
    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      void(this, frequencyHz, magResponse, phaseResponse);
    }
  }
  return IIRFilterNode;
}

module.exports = { create };
