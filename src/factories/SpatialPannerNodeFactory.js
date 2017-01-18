"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const PanningModelType = require("../types/PanningModelType");
const DistanceModelType = require("../types/DistanceModelType");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_PANNING_MODEL = PanningModelType.EQUALPOWER;
const DEFAULT_DISTANCE_MODEL = DistanceModelType.INVERSE;
const DEFAULT_REF_DISTANCE = 1;
const DEFAULT_MAX_DISTANCE = 10000;
const DEFAULT_ROLLOFF_FACTOR = 1;
const DEFAULT_CONE_INNER_ANGLE = 360;
const DEFAULT_CONE_OUTER_ANGLE = 360;
const DEFAULT_CONE_OUTER_GAIN = 0;
const DEFAULT_POSITION_X = 0;
const DEFAULT_POSITION_Y = 0;
const DEFAULT_POSITION_Z = 0;
const DEFAULT_ORIENTATION_X = 1;
const DEFAULT_ORIENTATION_Y = 0;
const DEFAULT_ORIENTATION_Z = 0;

function create(api, AudioNode) {
  class SpatialPannerNode extends AudioNode {
    /**
     * @protected - audioContext.createSpatialPanner()
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
        this._.className = "SpatialPannerNode";
        initialize.call(this, api, context, opts);
      } finally { lock.lock(); }
    }

    /**
     * @type {PanningModelType}
     */
    get panningModel() {
      return this._.panningModel;
    }

    set panningModel(value) {
      this._.panningModel = value;
    }

    /**
     * @type {DistanceModelType}
     */
    get distanceModel() {
      return this._.distanceModel;
    }

    set distanceModel(value) {
      this._.distanceModel = value;
    }

    /**
     * @type {number}
     */
    get refDistance() {
      return this._.refDistance;
    }

    set refDistance(value) {
      this._.refDistance = value;
    }

    /**
     * @type {number}
     */
    get maxDistance() {
      return this._.maxDistance;
    }

    set maxDistance(value) {
      this._.maxDistance = value;
    }

    /**
     * @type {number}
     */
    get rolloffFactor() {
      return this._.rolloffFactor;
    }

    set rolloffFactor(value) {
      this._.rolloffFactor = value;
    }

    /**
     * @type {number}
     */
    get coneInnerAngle() {
      return this._.coneInnerAngle;
    }

    set coneInnerAngle(value) {
      this._.coneInnerAngle = value;
    }

    /**
     * @type {number}
     */
    get coneOuterAngle() {
      return this._.coneOuterAngle;
    }

    set coneOuterAngle(value) {
      this._.coneOuterAngle = value;
    }

    /**
     * @type {number}
     */
    get coneOuterGain() {
      return this._.coneOuterGain;
    }

    set coneOuterGain(value) {
      this._.coneOuterGain = value;
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
    get orientationX() {
      return this._.orientationX;
    }

    /**
     * @type {AudioParam}
     */
    get orientationY() {
      return this._.orientationY;
    }

    /**
     * @type {AudioParam}
     */
    get orientationZ() {
      return this._.orientationZ;
    }
  }
  return SpatialPannerNode;
}

function initialize(api, context, opts) {
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

  this._.panningModel = panningModel;
  this._.distanceModel = distanceModel;
  this._.refDistance = refDistance;
  this._.maxDistance = maxDistance;
  this._.rolloffFactor = rolloffFactor;
  this._.coneInnerAngle = coneInnerAngle;
  this._.coneOuterAngle = coneOuterAngle;
  this._.coneOuterGain = coneOuterGain;
  this._.positionX = new api.AudioParam(context, {
    name: "Panner.positionX", defaultValue: DEFAULT_POSITION_X, value: positionX
  });
  this._.positionY = new api.AudioParam(context, {
    name: "Panner.positionY", defaultValue: DEFAULT_POSITION_Y, value: positionY
  });
  this._.positionZ = new api.AudioParam(context, {
    name: "Panner.positionZ", defaultValue: DEFAULT_POSITION_Z, value: positionZ
  });
  this._.orientationX = new api.AudioParam(context, {
    name: "Panner.orientationX", defaultValue: DEFAULT_ORIENTATION_X, value: orientationX
  });
  this._.orientationY = new api.AudioParam(context, {
    name: "Panner.orientationY", defaultValue: DEFAULT_ORIENTATION_Y, value: orientationY
  });
  this._.orientationZ = new api.AudioParam(context, {
    name: "Panner.orientationZ", defaultValue: DEFAULT_ORIENTATION_Z, value: orientationZ
  });
}

module.exports = { create, initialize };
