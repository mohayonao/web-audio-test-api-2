"use strict";

const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const MIN_VALUE = -3.4028234663852886e+38;
const MAX_VALUE = +3.4028234663852886e+38;

function create(api, BaseObject) {
  class AudioParam extends BaseObject {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     */
    constructor(context, opts = {}) {
      const name = defaults(opts.name, "");
      const defaultValue = defaults(opts.defaultValue, 0);
      const minValue = defaults(opts.minValue, MIN_VALUE);
      const maxValue = defaults(opts.maxValue, MAX_VALUE);
      const value = defaults(opts.value, defaultValue);

      try { lock.unlock();
        super();
        this._.className = "AudioParam";
      } finally { lock.lock(); }

      this._.name = name;
      this._.defaultValue = defaultValue;
      this._.minValue = minValue;
      this._.maxValue = maxValue;
      this._.value = value;
    }

    /**
     * @type {number}
     */
    get value() {
      return this._.value;
    }

    set value(value) {
      this._.value = value;
    }

    /**
     * @type {number}
     */
    get defaultValue() {
      return this._.defaultValue;
    }

    /**
     * @type {number}
     */
    get minValue() {
      return this._.minValue;
    }

    /**
     * @type {number}
     */
    get maxValue() {
      return this._.maxValue;
    }

    /**
     * @param {number} value
     * @param {number} startTime
     * @return {AudioParam}
     */
    setValueAtTime(value, startTime) {
      void(this, value, startTime);
      if (!api.get("/AudioParam/setValueAtTime/void")) {
        return this;
      }
    }

    /**
     * @param {number} value
     * @param {number} endTime
     * @return {AudioParam}
     */
    linearRampToValueAtTime(value, endTime) {
      void(this, value, endTime);
      if (!api.get("/AudioParam/linearRampToValueAtTime/void")) {
        return this;
      }
    }

    /**
     * @param {number} value
     * @param {number} endTime
     * @return {AudioParam}
     */
    exponentialRampToValueAtTime(value, endTime) {
      void(this, value, endTime);
      if (!api.get("/AudioParam/exponentialRampToValueAtTime/void")) {
        return this;
      }
    }

    /**
     * @param {number} target
     * @param {number} startTime
     * @param {number} timeConstant
     * @return {AudioParam}
     */
    setTargetAtTime(target, startTime, timeConstant) {
      void(this, target, startTime, timeConstant);
      if (!api.get("/AudioParam/setTargetAtTime/void")) {
        return this;
      }
    }

    /**
     * @param {Float32Array} curve
     * @param {number} startTime
     * @param {number} duration
     * @return {AudioParam}
     */
    setValueCurveAtTime(curve, startTime, duration) {
      void(this, curve, startTime, duration);
      if (!api.get("/AudioParam/setValueCurveAtTime/void")) {
        return this;
      }
    }

    /**
     * @param {number} cancelTime
     * @return {AudioParam}
     */
    cancelScheduledValues(cancelTime) {
      void(this, cancelTime);
      if (!api.get("/AudioParam/cancelScheduledValues/void")) {
        return this;
      }
    }

    /**
     * @param {number} cancelTime
     * @return {AudioParam}
     */
    cancelAndHoldAtTime(cancelTime) {
      void(this, cancelTime);
      if (!api.get("/AudioParam/cancelAndHoldAtTime/void")) {
        return this;
      }
    }

    /**
     * @deprecated
     * @type {string}
     */
    get name() {
      return this._.name;
    }

    /**
     * @deprecated
     * @type {number}
     */
    get units() {
      return 0;
    }

    /**
     * @deprecated
     * @type {number}
     */
    get computedValue() {
      return this._.value;
    }

    /**
     * @deprecated
     * @param {number} target
     * @param {number} startTime
     * @param {number} timeConstant
     * @return {AudioParam}
     */
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
