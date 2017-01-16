"use strict";

const lock = require("../utils/lock");

function create(api, AudioNode) {
  class AudioScheduledSourceNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     * @param {Object} [config]
     */
    constructor(context, opts = {}, config = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioScheduledSourceNode")) {
        throw new TypeError("Illegal constructor");
      }
      try { lock.unlock();
        super(context, opts, config);
        initialize.call(this, api, opts);
      } finally { lock.lock(); }

      this._.className = "AudioScheduledSourceNode";
    }

    /**
     * @type {function?}
     */
    get onended() {
      return this._.onended;
    }

    set onended(value) {
      this._.onended = value;
    }

    /**
     * @param {number} [when]
     * @return {void}
     */
    start(when = 0) {
      start.call(this, when);
    }

    /**
     * @param {number} [when]
     * @return {void}
     */
    stop(when = 0) {
      stop.call(this, when);
    }
  }
  return AudioScheduledSourceNode;
}

function initialize() {
  this._.onended = null;
  this._.startTime = Infinity;
  this._.stopTime = Infinity;
}

function start(when) {
  this._.startTime = when;
}

function stop(when) {
  this._.stopTime = when;
}

module.exports = { create, initialize, start, stop };
