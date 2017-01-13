"use strict";

function create(api, EventTarget) {
  class AudioNode extends EventTarget {
    get context() {
      void(this);
    }

    get numberOfInputs() {
      void(this);
    }

    get numberOfOutputs() {
      void(this);
    }

    get channelCount() {
      void(this);
    }

    set channelCount(value) {
      void(this, value);
    }

    get channelCountMode() {
      void(this);
    }

    set channelCountMode(value) {
      void(this, value);
    }

    get channelInterpretation() {
      void(this);
    }

    set channelInterpretation(value) {
      void(this, value);
    }

    connect(destination, output = 0, input = 0) {
      void(this, destination, output, input);
    }

    disconnect(...args) {
      void(this, args);
    }
  }
  return AudioNode;
}

module.exports = { create };
