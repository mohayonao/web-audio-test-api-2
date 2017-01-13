"use strict";

function create(api, AudioNode) {
  class PannerNode extends AudioNode {
    get panningModel() {
      void(this);
    }

    set panningModel(value) {
      void(this, value);
    }

    get distanceModel() {
      void(this);
    }

    set distanceModel(value) {
      void(this, value);
    }

    get refDistance() {
      void(this);
    }

    set refDistance(value) {
      void(this, value);
    }

    get maxDistance() {
      void(this);
    }

    set maxDistance(value) {
      void(this, value);
    }

    get rolloffFactor() {
      void(this);
    }

    set rolloffFactor(value) {
      void(this, value);
    }

    get coneInnerAngle() {
      void(this);
    }

    set coneInnerAngle(value) {
      void(this, value);
    }

    get coneOuterAngle() {
      void(this);
    }

    set coneOuterAngle(value) {
      void(this, value);
    }

    get coneOuterGain() {
      void(this);
    }

    set coneOuterGain(value) {
      void(this, value);
    }

    get positionX() {
      void(this);
    }

    get positionY() {
      void(this);
    }

    get positionZ() {
      void(this);
    }

    get orientationX() {
      void(this);
    }

    get orientationY() {
      void(this);
    }

    get orientationZ() {
      void(this);
    }

    setPosition(x, y, z) {
      void(this, x, y, z);
    }

    setOrientation(x, y, z) {
      void(this, x, y, z);
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
      void(this);
    }

    get distanceGain() {
      void(this);
    }
  }
  return PannerNode;
}

module.exports = { create };
