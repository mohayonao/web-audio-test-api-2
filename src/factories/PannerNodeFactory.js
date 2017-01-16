"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const lock = require("../utils/lock");
const { initialize } = require("./SpatialPannerNodeFactory");

function create(api, AudioNode) {
  class PannerNode extends AudioNode {
    /**
     * @protected
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 2 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.CLAMPED_MAX,
          allowedMaxChannelCount: 2,
          allowedChannelCountMode: [ ChannelCountMode.CLAMPED_MAX, ChannelCountMode.EXPLICIT ]
        });
        initialize.call(this, api, context, opts);
      } finally { lock.lock(); }

      this._.className = "PannerNode";
      this._.coneGain = new api.AudioParam(context, {
        name: "coneGain"
      });
      this._.distanceGain = new api.AudioParam(context, {
        name: "distanceGain"
      });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {void}
     */
    setPosition(x, y, z) {
      this._.positionX.value = x;
      this._.positionY.value = y;
      this._.positionZ.value = z;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {void}
     */
    setOrientation(x, y, z) {
      this._.orientationX.value = x;
      this._.orientationY.value = y;
      this._.orientationZ.value = z;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @return {void}
     */
    setVelocity(x, y, z) {
      void(this, x, y, z);
    }

    /**
     * @deprecated
     * @type {PanningModelType}
     */
    get EQUALPOWER() {
      return api.types.PanningModelType.EQUALPOWER;
    }

    /**
     * @deprecated
     * @type {PanningModelType}
     */
    get HRTF() {
      return api.types.PanningModelType.HRTF;
    }

    /**
     * @deprecated
     * @type {PanningModelType}
     */
    get SOUNDFIELD() {
      return api.types.PanningModelType.SOUNDFIELD;
    }

    /**
     * @deprecated
     * @type {DistanceModelType}
     */
    get LINEAR_DISTANCE() {
      return api.types.DistanceModelType.LINEAR;
    }

    /**
     * @deprecated
     * @type {DistanceModelType}
     */
    get INVERSE_DISTANCE() {
      return api.types.DistanceModelType.INVERSE;
    }

    /**
     * @deprecated
     * @type {DistanceModelType}
     */
    get EXPONENTIAL_DISTANCE() {
      return api.types.DistanceModelType.EXPONENTIAL;
    }

    /**
     * @deprecated
     * @type {AudioParam}
     */
    get coneGain() {
      return this._.coneGain;
    }

    /**
     * @deprecated
     * @type {AudioParam}
     */
    get distanceGain() {
      return this._.distanceGain;
    }
  }
  return PannerNode;
}

module.exports = { create };
