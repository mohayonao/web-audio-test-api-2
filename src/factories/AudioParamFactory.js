"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const MIN_VALUE = -3.4028234663852886e+38;
const MAX_VALUE = +3.4028234663852886e+38;

function create(api, BaseObject) {
  class AudioParam extends BaseObject {
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/AudioParam")) {
        throw new TypeError("Illegal constructor");
      }

      const name = defaults(opts.name, "");
      const defaultValue = defaults(opts.defaultValue, 0);
      const minValue = defaults(opts.minValue, MIN_VALUE);
      const maxValue = defaults(opts.maxValue, MAX_VALUE);
      const value = defaults(opts.value, defaultValue);

      lock.unlock();
      super();
      lock.lock();

      this._.className = "AudioParam";
      this._.name = name;
      this._.defaultValue = defaultValue;
      this._.minValue = minValue;
      this._.maxValue = maxValue;
      this._.value = value;
    }

    get value() {
      return this._.value;
    }

    set value(value) {
      this._.value = value;
    }

    get defaultValue() {
      return this._.defaultValue;
    }

    get minValue() {
      return this._.minValue;
    }

    get maxValue() {
      return this._.maxValue;
    }

    setValueAtTime(value, startTime) {
      void(this, value, startTime);
      if (!api.get("/AudioParam/setValueAtTime/void")) {
        return this;
      }
    }

    linearRampToValueAtTime(value, endTime) {
      void(this, value, endTime);
      if (!api.get("/AudioParam/linearRampToValueAtTime/void")) {
        return this;
      }
    }

    exponentialRampToValueAtTime(value, endTime) {
      void(this, value, endTime);
      if (!api.get("/AudioParam/exponentialRampToValueAtTime/void")) {
        return this;
      }
    }

    setTargetAtTime(target, startTime, timeConstant) {
      void(this, target, startTime, timeConstant);
      if (!api.get("/AudioParam/setTargetAtTime/void")) {
        return this;
      }
    }

    setValueCurveAtTime(curve, startTime, duration) {
      void(this, curve, startTime, duration);
      if (!api.get("/AudioParam/setValueCurveAtTime/void")) {
        return this;
      }
    }

    cancelScheduledValues(cancelTime) {
      void(this, cancelTime);
      if (!api.get("/AudioParam/cancelScheduledValues/void")) {
        return this;
      }
    }

    cancelAndHoldAtTime(cancelTime) {
      void(this, cancelTime);
      if (!api.get("/AudioParam/cancelAndHoldAtTime/void")) {
        return this;
      }
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get name() {
      return this._.name;
    }

    get units() {
      return 0;
    }

    get computedValue() {
      return this._.value;
    }

    setTargetValueAtTime(target, startTime, timeConstant) {
      void(this, target, startTime, timeConstant);
      if (!api.get("/AudioParam/setTargetValueAtTime/void")) {
        return this;
      }
    }
  }
  return AudioParam;
}

module.exports = { create };
