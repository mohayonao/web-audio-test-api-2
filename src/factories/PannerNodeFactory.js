"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const lock = require("../utils/lock");
const { initialize } = require("./SpatialPannerNodeFactory");

function create(api, AudioNode) {
  class PannerNode extends AudioNode {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/PannerNode")) {
        throw new TypeError("Illegal constructor");
      }
      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 2 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.CLAMPED_MAX,
        allowedMaxChannelCount: 2,
        allowedChannelCountMode: [ ChannelCountMode.CLAMPED_MAX, ChannelCountMode.EXPLICIT ]
      });
      initialize.call(this, api, context, opts);
      lock.lock();

      this._.className = "PannerNode";
      this._.coneGain = new api.AudioParam(context, {
        name: "coneGain"
      });
      this._.distanceGain = new api.AudioParam(context, {
        name: "distanceGain"
      });
    }

    setPosition(x, y, z) {
      this._.positionX.value = x;
      this._.positionY.value = y;
      this._.positionZ.value = z;
    }

    setOrientation(x, y, z) {
      this._.orientationX.value = x;
      this._.orientationY.value = y;
      this._.orientationZ.value = z;
    }

    setVelocity(x, y, z) {
      void(this, x, y, z);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    static get EQUALPOWER() {
      return api.types.PanningModelType.EQUALPOWER;
    }

    static get HRTF() {
      return api.types.PanningModelType.HRTF;
    }

    static get SOUNDFIELD() {
      return api.types.PanningModelType.SOUNDFIELD;
    }

    static get LINEAR_DISTANCE() {
      return api.types.DistanceModelType.LINEAR_DISTANCE;
    }

    static get INVERSE_DISTANCE() {
      return api.types.DistanceModelType.INVERSE_DISTANCE;
    }

    static get EXPONENTIAL_DISTANCE() {
      return api.types.DistanceModelType.EXPONENTIAL_DISTANCE;
    }

    get EQUALPOWER() {
      return api.types.PanningModelType.EQUALPOWER;
    }

    get HRTF() {
      return api.types.PanningModelType.HRTF;
    }

    get SOUNDFIELD() {
      return api.types.PanningModelType.SOUNDFIELD;
    }

    get LINEAR_DISTANCE() {
      return api.types.DistanceModelType.LINEAR_DISTANCE;
    }

    get INVERSE_DISTANCE() {
      return api.types.DistanceModelType.INVERSE_DISTANCE;
    }

    get EXPONENTIAL_DISTANCE() {
      return api.types.DistanceModelType.EXPONENTIAL_DISTANCE;
    }

    get coneGain() {
      return this._.coneGain;
    }

    get distanceGain() {
      return this._.distanceGain;
    }
  }
  return PannerNode;
}

module.exports = { create };
