"use strict";

const format = require("../utils/format");
const lock = require("../utils/lock");

function create(api, AudioNode) {
  class AudioScheduledSourceNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {object} config
     */
    constructor(context, opts = {}, config = {}) {
      try { lock.unlock();
        super(context, opts, config);
        this._.className = "AudioScheduledSourceNode";
        initialize.call(this, api, opts);
      } finally { lock.lock(); }
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
     * @param {positive} when
     * @return {void}
     */
    start(when = 0) {
      if (!(this._.startTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'start' on '${ this._.className }':
          Cannot call start more than once.
        `));
      }
      start.call(this, when);
    }

    /**
     * @param {positive} when
     * @return {void}
     */
    stop(when = 0) {
      if (!(this._.startTime !== Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'stop' on '${ this._.className }':
          Cannot call stop without calling start first.
        `));
      }
      if (!(this._.stopTime === Infinity)) {
        throw new TypeError(format(`
          Failed to execute 'stop' on '${ this._.className }':
          Cannot call stop more than once.
        `));
      }
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
