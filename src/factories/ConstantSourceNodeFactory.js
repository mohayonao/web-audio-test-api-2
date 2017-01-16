"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");
const { initialize } = require("./AudioScheduledSourceNodeFactory");

const DEFAULT_OFFSET = 1;

function create(api, AudioScheduledSourceNode) {
  class ConstantSourceNode extends AudioScheduledSourceNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/ConstantSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {number} */
      const offset = defaults(opts.offset, DEFAULT_OFFSET);

      try { lock.unlock();
        super(context, opts, { inputs: [], outputs: [ 1 ] });
        if (!(this instanceof api.AudioScheduledSourceNode)) {
          initialize.call(this, api, opts);
        }
      } finally { lock.lock(); }

      this._.className = "ConstantSourceNode";
      this._.offset = new api.AudioParam(context, {
        name: "offset", defaultValue: DEFAULT_OFFSET, value: offset
      });
    }

    /**
     * @type {AudioParam}
     */
    get offset() {
      return this._.offset;
    }
  }
  return ConstantSourceNode;
}

module.exports = { create };
