"use strict";

const AudioNodeInput = require("../impl/AudioNodeInput");
const AudioParamImpl = require("../impl/AudioParamImpl");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const MIN_VALUE = -3.4028234663852886e+38;
const MAX_VALUE = +3.4028234663852886e+38;

function create(api, BaseObject) {
  class AudioParam extends BaseObject {
    /**
     * @protected - internal class cannot construct directly
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

      this._.context = context;
      this._.name = name;
      this._.defaultValue = defaultValue;
      this._.minValue = minValue;
      this._.maxValue = maxValue;
      this._.value = value;
      this._.inputs = [
        new AudioNodeInput({ node: this, index: 0 }),
      ];
      this._.timeline = [];

      this.value = value;
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
     * @param {positive} startTime
     * @return {AudioParam}
     */
    setValueAtTime(value, startTime) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "setValueAtTime",
        time: startTime,
        args: [ value, startTime ]
      });
      if (api.get("/AudioParam/setValueAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {number} value
     * @param {positive} endTime
     * @return {AudioParam}
     */
    linearRampToValueAtTime(value, endTime) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "linearRampToValueAtTime",
        time: endTime,
        args: [ value, endTime ]
      });
      if (api.get("/AudioParam/linearRampToValueAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {number} value
     * @param {positive} endTime
     * @return {AudioParam}
     */
    exponentialRampToValueAtTime(value, endTime) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "exponentialRampToValueAtTime",
        time: endTime,
        args: [ value, endTime ]
      });
      if (api.get("/AudioParam/exponentialRampToValueAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {number} target
     * @param {positive} startTime
     * @param {positive} timeConstant
     * @return {AudioParam}
     */
    setTargetAtTime(target, startTime, timeConstant) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "setTargetAtTime",
        time: startTime,
        args: [ target, startTime, timeConstant ]
      });
      if (api.get("/AudioParam/setTargetAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {Float32Array} curve
     * @param {positive} startTime
     * @param {positive} duration
     * @return {AudioParam}
     */
    setValueCurveAtTime(curve, startTime, duration) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "setValueCurveAtTime",
        time: startTime,
        args: [ curve, startTime, duration ]
      });
      if (api.get("/AudioParam/setValueCurveAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {positive} cancelTime
     * @return {AudioParam}
     */
    cancelScheduledValues(cancelTime) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "cancelScheduledValues",
        time: cancelTime,
        args: [ cancelTime ]
      });
      if (api.get("/AudioParam/cancelScheduledValues/chain")) {
        return this;
      }
    }

    /**
     * @param {positive} cancelTime
     * @return {AudioParam}
     */
    cancelAndHoldAtTime(cancelTime) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "cancelScheduledValues",
        time: cancelTime,
        args: [ cancelTime ]
      });
      if (api.get("/AudioParam/cancelAndHoldAtTime/chain")) {
        return this;
      }
    }

    /**
     * @deprecated 2012-08-02
     * @type {string}
     */
    get name() {
      return this._.name;
    }

    /**
     * @deprecated 2012-08-02
     * @type {positive}
     */
    get units() {
      return 0;
    }

    /**
     * @deprecated 2013-10-10
     * @type {number}
     */
    get computedValue() {
      return this._.value;
    }

    /**
     * @deprecated 2012-12-13 - use 'setTargetAtTime(target, startTime, timeConstant)' instead
     * @param {number} target
     * @param {positive} startTime
     * @param {positive} timeConstant
     * @return {AudioParam}
     */
    setTargetValueAtTime(target, startTime, timeConstant) {
      AudioParamImpl.insertEvent.call(this, this._.timeline, {
        type: "setTargetAtTime",
        time: startTime,
        args: [ target, startTime, timeConstant ]
      });
      if (api.get("/AudioParam/setTargetValueAtTime/chain")) {
        return this;
      }
    }
  }
  return AudioParam;
}

module.exports = { create };
