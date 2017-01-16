"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, BaseObject) {
  class PeriodicWave extends BaseObject {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      /** @type {Float32Array} */
      const real = defaults(opts.real, null);
      /** @type {Float32Array} */
      const imag = defaults(opts.imag, null);

      try { lock.unlock();
        super(context, opts);
      } finally { lock.lock(); }

      this._.className = "PeriodicWave";
      this._.real = real;
      this._.imag = imag;
    }
  }
  return PeriodicWave;
}

module.exports = { create };
