"use strict";

function create(api, BaseObject) {
  class SpatialListener extends BaseObject {
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
  }
  return SpatialListener;
}

module.exports = { create };
