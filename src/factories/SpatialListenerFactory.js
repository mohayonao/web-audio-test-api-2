"use strict";

const lock = require("../utils/lock");

function create(api, BaseObject) {
  class SpatialListener extends BaseObject {
    /**
     * @protected - audioContext.listener
     * @param {BaseAudioContext} context
     * @param {object} opts
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts);
        this._.className = "SpatialListener";
        initialize.call(this, api, context, opts);
      } finally { lock.lock(); }

    }

    /**
     * @type {AudioParam}
     */
    get positionX() {
      return this._.positionX;
    }

    /**
     * @type {AudioParam}
     */
    get positionY() {
      return this._.positionY;
    }

    /**
     * @type {AudioParam}
     */
    get positionZ() {
      return this._.positionZ;
    }

    /**
     * @type {AudioParam}
     */
    get forwardX() {
      return this._.forwardX;
    }

    /**
     * @type {AudioParam}
     */
    get forwardY() {
      return this._.forwardY;
    }

    /**
     * @type {AudioParam}
     */
    get forwardZ() {
      return this._.forwardZ;
    }

    /**
     * @type {AudioParam}
     */
    get upX() {
      return this._.upX;
    }

    /**
     * @type {AudioParam}
     */
    get upY() {
      return this._.upY;
    }

    /**
     * @type {AudioParam}
     */
    get upZ() {
      return this._.upZ;
    }
  }
  return SpatialListener;
}

function initialize(api, context) {
  this._.positionX = new api.AudioParam(context, {
    name: "Listener.positionX", defaultValue: 0
  });
  this._.positionY = new api.AudioParam(context, {
    name: "Listener.positionY", defaultValue: 0
  });
  this._.positionZ = new api.AudioParam(context, {
    name: "Listener.positionZ", defaultValue: 0
  });
  this._.forwardX = new api.AudioParam(context, {
    name: "Listener.forwardX", defaultValue: 0
  });
  this._.forwardY = new api.AudioParam(context, {
    name: "Listener.forwardY", defaultValue: 0
  });
  this._.forwardZ = new api.AudioParam(context, {
    name: "Listener.forwardZ", defaultValue: -1
  });
  this._.upX = new api.AudioParam(context, {
    name: "Listener.upX", defaultValue: 0
  });
  this._.upY = new api.AudioParam(context, {
    name: "Listener.upY", defaultValue: 1
  });
  this._.upZ = new api.AudioParam(context, {
    name: "Listener.upZ", defaultValue: 0
  });
}

module.exports = { create, initialize };
