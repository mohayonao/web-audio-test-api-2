"use strict";

function create(api, AudioNode) {
  class SpatialPannerNode extends AudioNode {
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
  }
  return SpatialPannerNode;
}

module.exports = { create };
