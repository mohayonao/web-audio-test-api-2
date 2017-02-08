"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const lock = require("../utils/lock");
const { initialize } = require("./SpatialPannerNodeFactory");

function create(api, AudioNode) {
  class PannerNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createPanner()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
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
        this._.className = "PannerNode";
        initialize.call(this, api, context, opts);
      } finally { lock.lock(); }

      this._.coneGain = new api.AudioParam(context, {
        name: "coneGain"
      });
      this._.distanceGain = new api.AudioParam(context, {
        name: "distanceGain"
      });
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
     * @return {void}
     */
    setOrientation(x, y, z) {
      this._.orientationX.value = x;
      this._.orientationY.value = y;
      this._.orientationZ.value = z;
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
     * @deprecated 2012-12-13 - use string ("equalpower") instead
     * @type {PanningModelType}
     */
    get EQUALPOWER() {
      return api.types.PanningModelType.EQUALPOWER;
    }

    /**
     * @deprecated 2012-12-13 - use string ("HRTF") instead
     * @type {PanningModelType}
     */
    get HRTF() {
      return api.types.PanningModelType.HRTF;
    }

    /**
     * @deprecated 2012-12-13
     * @type {PanningModelType}
     */
    get SOUNDFIELD() {
      return api.types.PanningModelType.SOUNDFIELD;
    }

    /**
     * @deprecated 2012-12-13 - use string ("linear") instead
     * @type {DistanceModelType}
     */
    get LINEAR_DISTANCE() {
      return api.types.DistanceModelType.LINEAR;
    }

    /**
     * @deprecated 2012-12-13 - use string ("inverse") instead
     * @type {DistanceModelType}
     */
    get INVERSE_DISTANCE() {
      return api.types.DistanceModelType.INVERSE;
    }

    /**
     * @deprecated 2012-12-13 - use string ("exponential") instead
     * @type {DistanceModelType}
     */
    get EXPONENTIAL_DISTANCE() {
      return api.types.DistanceModelType.EXPONENTIAL;
    }

    /**
     * @deprecated 2012-12-13
     * @type {AudioParam}
     */
    get coneGain() {
      return this._.coneGain;
    }

    /**
     * @deprecated 2012-12-13
     * @type {AudioParam}
     */
    get distanceGain() {
      return this._.distanceGain;
    }
  }
  return PannerNode;
}

module.exports = { create };
