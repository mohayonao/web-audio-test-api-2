"use strict";

const lock = require("../utils/lock");

function create(api, AudioNode) {
  class AudioSourceNode extends AudioNode {
    constructor(context, opts = {}, config = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioSourceNode")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts, config);
      lock.lock();

      this._.className = "AudioSourceNode";
    }
  }
  return AudioSourceNode;
}

module.exports = { create };
