"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, BaseObject) {
  class PeriodicWave extends BaseObject {
    /**
     * @protected - use 'audioContext.createPeriodicWave(real, imag)' instead
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
        this._.className = "PeriodicWave";
      } finally { lock.lock(); }

      this._.real = real;
      this._.imag = imag;
    }
  }
  return PeriodicWave;
}

module.exports = { create };
