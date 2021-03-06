"use strict";

const lock = require("../utils/lock");

/* istanbul ignore next */
function create(api, Worker) {
  class AudioWorker extends Worker {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts);
        this._.className = "AudioWorker";
      } finally { lock.lock(); }
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
