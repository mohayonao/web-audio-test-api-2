"use strict";

function create(api, BaseObject) {
  class AudioListener extends BaseObject {
    get positionX() {
      void(this);
    }

    get positionY() {
      void(this);
    }

    get positionZ() {
      void(this);
    }

    get forwardX() {
      void(this);
    }

    get forwardY() {
      void(this);
    }

    get forwardZ() {
      void(this);
    }

    get upX() {
      void(this);
    }

    get upY() {
      void(this);
    }

    get upZ() {
      void(this);
    }

    setPosition(x, y, z) {
      void(this, x, y, z);
    }

    setOrientation(x, y, z, xUp, yUp, zUp) {
      void(this, x, y, z, xUp, yUp, zUp);
    }

    setVelocity(x, y, z) {
      void(this, x, y, z);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get gain() {
      void(this);
    }

    set gain(value) {
      void(this, value);
    }

    get dopplerFactor() {
      void(this);
    }

    set dopplerFactor(value) {
      void(this, value);
    }

    get speedOfSound() {
      void(this);
    }

    set speedOfSound(value) {
      void(this, value);
    }
  }
  return AudioListener;
}

module.exports = { create };
