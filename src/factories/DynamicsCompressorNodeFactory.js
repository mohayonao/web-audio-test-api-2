"use strict";

function create(api, AudioNode) {
  class DynamicsCompressorNode extends AudioNode {
    get threshold() {
      void(this);
    }

    get knee() {
      void(this);
    }

    get ratio() {
      void(this);
    }

    get reduction() {
      void(this);
    }

    get attack() {
      void(this);
    }

    get release() {
      void(this);
    }
  }
  return DynamicsCompressorNode;
}

module.exports = { create };
