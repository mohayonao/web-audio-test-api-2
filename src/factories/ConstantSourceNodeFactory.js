"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");
const { initialize } = require("./AudioScheduledSourceNodeFactory");

const DEFAULT_OFFSET = 1;

function create(api, AudioScheduledSourceNode) {
  class ConstantSourceNode extends AudioScheduledSourceNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/ConstantSourceNode")) {
        throw new TypeError("Illegal constructor");
      }

      const offset = defaults(opts.offset, DEFAULT_OFFSET);

      lock.unlock();
      super(context, opts, { inputs: [], outputs: [ 1 ] });
      if (!(this instanceof api.AudioScheduledSourceNode)) {
        initialize.call(this, api, opts);
      }
      lock.lock();

      this._.className = "ConstantSourceNode";
      this._.offset = new api.AudioParam(context, {
        name: "offset", defaultValue: DEFAULT_OFFSET, value: offset
      });
    }

    get offset() {
      return this._.offset;
    }
  }
  return ConstantSourceNode;
}

module.exports = { create };
