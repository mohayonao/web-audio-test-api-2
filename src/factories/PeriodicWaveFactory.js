"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, BaseObject) {
  class PeriodicWave extends BaseObject {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {Float32Array} opts.real
     * @param {Float32Array} opts.imag
     */
    constructor(context, opts = {}) {
      const real = defaults(opts.real, null);
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
