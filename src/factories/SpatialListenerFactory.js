"use strict";

const lock = require("../utils/lock");

function create(api, BaseObject) {
  class SpatialListener extends BaseObject {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/SpatialListener")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts);
      initialize.call(this, api, context, opts);
      lock.lock();

      this._.className = "SpatialListener";
    }

    get positionX() {
      return this._.positionX;
    }

    get positionY() {
      return this._.positionY;
    }

    get positionZ() {
      return this._.positionZ;
    }

    get forwardX() {
      return this._.forwardX;
    }

    get forwardY() {
      return this._.forwardY;
    }

    get forwardZ() {
      return this._.forwardZ;
    }

    get upX() {
      return this._.upX;
    }

    get upY() {
      return this._.upY;
    }

    get upZ() {
      return this._.upZ;
    }
  }
  return SpatialListener;
}

function initialize(api, context) {
  this._.positionX = new api.AudioParam(context, {
    name: "positionX", defaultValue: 0
  });
  this._.positionY = new api.AudioParam(context, {
    name: "positionY", defaultValue: 0
  });
  this._.positionZ = new api.AudioParam(context, {
    name: "positionZ", defaultValue: 0
  });
  this._.forwardX = new api.AudioParam(context, {
    name: "forwardX", defaultValue: 0
  });
  this._.forwardY = new api.AudioParam(context, {
    name: "forwardY", defaultValue: 0
  });
  this._.forwardZ = new api.AudioParam(context, {
    name: "forwardZ", defaultValue: -1
  });
  this._.upX = new api.AudioParam(context, {
    name: "upX", defaultValue: 0
  });
  this._.upY = new api.AudioParam(context, {
    name: "upY", defaultValue: 1
  });
  this._.upZ = new api.AudioParam(context, {
    name: "upZ", defaultValue: 0
  });
}

module.exports = { create, initialize };
