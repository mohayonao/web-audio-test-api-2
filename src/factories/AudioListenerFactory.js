"use strict";

const lock = require("../utils/lock");
const { initialize } = require("./SpatialListenerFactory");

function create(api, BaseObject) {
  class AudioListener extends BaseObject {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioListener")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts);
      initialize.call(this, api, context, opts);
      lock.lock();

      this._.className = "AudioListener";
      this._.dopplerFactor = 1;
      this._.speedOfSound = 343.3;
      this._.gain = 1;
    }

    setPosition(x, y, z) {
      this._.positionX.value = x;
      this._.positionY.value = y;
      this._.positionZ.value = z;
    }

    setOrientation(x, y, z, xUp, yUp, zUp) {
      this._.forwardX.value = x;
      this._.forwardY.value = y;
      this._.forwardZ.value = z;
      this._.upX.value = xUp;
      this._.upY.value = yUp;
      this._.upZ.value = zUp;
    }

    setVelocity(x, y, z) {
      void(this, x, y, z);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get gain() {
      return this._.gain;
    }

    set gain(value) {
      this._.gain = value;
    }

    get dopplerFactor() {
      return this._.dopplerFactor;
    }

    set dopplerFactor(value) {
      this._.dopplerFactor = value;
    }

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
