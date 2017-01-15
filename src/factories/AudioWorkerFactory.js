"use strict";

const lock = require("../utils/lock");

function create(api, Worker) {
  class AudioWorker extends Worker {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioWorker")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts);
      lock.lock();

      this._.className = "AudioWorker";
    }

    get parameters() {
      void(this);
    }

    get onmessage() {
      void(this);
    }

    set onmessage(value) {
      void(this, value);
    }

    get onloaded() {
      void(this);
    }

    set onloaded(value) {
      void(this, value);
    }

    terminate() {
      void(this);
    }

    postMessage(message, transfer) {
      void(this, message, transfer);
    }

    createNode(numberOfInputs, numberOfOutputs) {
      void(this, numberOfInputs, numberOfOutputs);
    }

    addParameter(name, defaultValue) {
      void(this, name, defaultValue);
    }

    removeParameter(name) {
      void(this, name);
    }
  }
  return AudioWorker;
}

module.exports = { create };
