"use strict";

const lock = require("../utils/lock");
const { initialize } = require("./SpatialListenerFactory");

function create(api, BaseObject) {
  class AudioListener extends BaseObject {
    /**
     * @protected - use 'audioContext.listener' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts);
        this._.className = "AudioListener";
        initialize.call(this, api, context, opts);
      } finally { lock.lock(); }

      this._.dopplerFactor = 1;
      this._.speedOfSound = 343.3;
      this._.gain = 1;
    }

    /**
     * @param {finite} x
     * @param {finite} y
     * @param {finite} z
     * @return {void}
     */
    setPosition(x, y, z) {
      this._.positionX.value = x;
      this._.positionY.value = y;
      this._.positionZ.value = z;
    }

    /**
     * @param {finite} x
     * @param {finite} y
     * @param {finite} z
     * @param {finite} xUp
     * @param {finite} yUp
     * @param {finite} zUp
     * @return {void}
     */
    setOrientation(x, y, z, xUp, yUp, zUp) {
      this._.forwardX.value = x;
      this._.forwardY.value = y;
      this._.forwardZ.value = z;
      this._.upX.value = xUp;
      this._.upY.value = yUp;
      this._.upZ.value = zUp;
    }

    /**
     * @param {finite} x
     * @param {finite} y
     * @param {finite} z
     * @return {void}
     */
    setVelocity(x, y, z) {
      void(this, x, y, z);
    }

    /**
     * @deprecated 2012-08-02
     * @type {finite}
     */
    get gain() {
      return this._.gain;
    }

    set gain(value) {
      this._.gain = value;
    }

    /**
     * @deprecated 2015-12-08
     * @type {finite}
     */
    get dopplerFactor() {
      return this._.dopplerFactor;
    }

    set dopplerFactor(value) {
      this._.dopplerFactor = value;
    }

    /**
     * @deprecated 2015-12-08
     * @type {finite}
     */
    get speedOfSound() {
      return this._.speedOfSound;
    }

    set speedOfSound(value) {
      this._.speedOfSound = value;
    }
  }
  return AudioListener;
}

module.exports = { create };
