"use strict";

function create(api, AudioNode) {
  class ConvolverNode extends AudioNode {
    get buffer() {
      void(this);
    }

    set buffer(value) {
      void(this, value);
    }

    get normalize() {
      void(this);
    }

    set normalize(value) {
      void(this, value);
    }
  }
  return ConvolverNode;
}

module.exports = { create };
