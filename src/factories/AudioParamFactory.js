"use strict";

function create(api, BaseObject) {
  class AudioParam extends BaseObject {
    get value() {
      void(this);
    }

    set value(value) {
      void(this);
    }

    get defaultValue() {
      void(this);
    }

    get minValue() {
      void(this);
    }

    get maxValue() {
      void(this);
    }

    setValueAtTime(value, startTime) {
      void(this, value, startTime);
    }

    linearRampToValueAtTime(value, endTime) {
      void(this, value, endTime);
    }

    exponentialRampToValueAtTime(value, endTime) {
      void(this, value, endTime);
    }

    setTargetAtTime(target, startTime, timeConstant) {
      void(this, target, startTime, timeConstant);
    }

    setValueCurveAtTime(curve, startTime, duration) {
      void(this, curve, startTime, duration);
    }

    cancelScheduledValues(startTime) {
      void(this, startTime);
    }

    cancelAndHoldAtTime(startTime) {
      void(this, startTime);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get name() {
      void(this);
    }

    get units() {
      void(this);
    }

    get computedValue() {
      void(this);
    }

    setTargetValueAtTime(target, startTime, timeConstant) {
      void(this, target, startTime, timeConstant);
    }
  }
  return AudioParam;
}

module.exports = { create };
