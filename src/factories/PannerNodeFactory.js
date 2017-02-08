"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");
const { initialize } = require("./SpatialPannerNodeFactory");
const { DEFAULT_PANNING_MODEL } = require("./SpatialPannerNodeFactory");
const { DEFAULT_DISTANCE_MODEL } = require("./SpatialPannerNodeFactory");
const { DEFAULT_REF_DISTANCE } = require("./SpatialPannerNodeFactory");
const { DEFAULT_MAX_DISTANCE } = require("./SpatialPannerNodeFactory");
const { DEFAULT_ROLLOFF_FACTOR } = require("./SpatialPannerNodeFactory");
const { DEFAULT_CONE_INNER_ANGLE } = require("./SpatialPannerNodeFactory");
const { DEFAULT_CONE_OUTER_ANGLE } = require("./SpatialPannerNodeFactory");
const { DEFAULT_CONE_OUTER_GAIN } = require("./SpatialPannerNodeFactory");
const { DEFAULT_POSITION_X } = require("./SpatialPannerNodeFactory");
const { DEFAULT_POSITION_Y } = require("./SpatialPannerNodeFactory");
const { DEFAULT_POSITION_Z } = require("./SpatialPannerNodeFactory");
const { DEFAULT_ORIENTATION_X } = require("./SpatialPannerNodeFactory");
const { DEFAULT_ORIENTATION_Y } = require("./SpatialPannerNodeFactory");
const { DEFAULT_ORIENTATION_Z } = require("./SpatialPannerNodeFactory");

function create(api, AudioNode) {
  class PannerNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createPanner()' instead
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {PanningModelType} opts.panningModel
     * @param {DistanceModelType} opts.distanceModel
     * @param {finite} opts.refDistance
     * @param {finite} opts.maxDistance
     * @param {finite} opts.rolloffFactor
     * @param {finite} opts.coneInnerAngle
     * @param {finite} opts.coneOuterAngle
     * @param {finite} opts.coneOuterGain
     * @param {finite} opts.positionX
     * @param {finite} opts.positionY
     * @param {finite} opts.positionZ
     * @param {finite} opts.orientationX
     * @param {finite} opts.orientationY
     * @param {finite} opts.orientationZ
     */
    constructor(context, opts = {}) {
      const panningModel = defaults(opts.panningModel, DEFAULT_PANNING_MODEL);
      const distanceModel = defaults(opts.distanceModel, DEFAULT_DISTANCE_MODEL);
      const refDistance = defaults(opts.refDistance, DEFAULT_REF_DISTANCE);
      const maxDistance = defaults(opts.maxDistance, DEFAULT_MAX_DISTANCE);
      const rolloffFactor = defaults(opts.rolloffFactor, DEFAULT_ROLLOFF_FACTOR);
      const coneInnerAngle = defaults(opts.coneInnerAngle, DEFAULT_CONE_INNER_ANGLE);
      const coneOuterAngle = defaults(opts.coneOuterAngle, DEFAULT_CONE_OUTER_ANGLE);
      const coneOuterGain = defaults(opts.coneOuterGain, DEFAULT_CONE_OUTER_GAIN);
      const positionX = defaults(opts.positionX, DEFAULT_POSITION_X);
      const positionY = defaults(opts.positionY, DEFAULT_POSITION_Y);
      const positionZ = defaults(opts.positionZ, DEFAULT_POSITION_Z);
      const orientationX = defaults(opts.orientationX, DEFAULT_ORIENTATION_X);
      const orientationY = defaults(opts.orientationY, DEFAULT_ORIENTATION_Y);
      const orientationZ = defaults(opts.orientationZ, DEFAULT_ORIENTATION_Z);

      opts = Object.assign({}, opts, {
        panningModel, distanceModel, refDistance, maxDistance,
        rolloffFactor, coneInnerAngle, coneOuterAngle, coneOuterGain,
        positionX, positionY, positionZ, orientationX, orientationY, orientationZ
      });

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
