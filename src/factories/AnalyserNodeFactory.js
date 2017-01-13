"use strict";

function create(api, AudioNode) {
  class AnalyserNode extends AudioNode {
    get fftSize() {
      void(this);
    }

    set fftSize(value) {
      void(this, value);
    }

    get frequencyBinCount() {
      void(this);
    }

    get maxDecibels() {
      void(this);
    }

    set maxDecibels(value) {
      void(this, value);
    }

    get minDecibels() {
      void(this);
    }

    set minDecibels(value) {
      void(this, value);
    }

    get smoothingTimeConstant() {
      void(this);
    }

    set smoothingTimeConstant(value) {
      void(this, value);
    }

    getByteFrequencyData(array) {
      void(this, array);
    }

    getByteTimeDomainData(array) {
      void(this, array);
    }

    getFloatFrequencyData(array) {
      void(this, array);
    }

    getFloatTimeDomainData(array) {
      void(this, array);
    }
  }
  return AnalyserNode;
}

module.exports = { create };
