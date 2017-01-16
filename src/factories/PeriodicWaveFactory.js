"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, BaseObject) {
  class PeriodicWave extends BaseObject {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/PeriodicWave")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {Float32Array} */
      const real = defaults(opts.real, null);
      /** @type {Float32Array} */
      const imag = defaults(opts.imag, null);

      lock.unlock();
      super(context, opts);
      lock.lock();

      this._.className = "PeriodicWave";
      this._.real = real;
      this._.imag = imag;
    }
  }
  return PeriodicWave;
}

module.exports = { create };
