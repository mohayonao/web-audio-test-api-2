"use strict";

const AudioNodeInput = require("../impl/AudioNodeInput");
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
     * @type {finite}
     */
    get value() {
      return this._.value;
    }

    set value(value) {
      this._.value = value;
    }

    /**
     * @type {finite}
     */
    get defaultValue() {
      return this._.defaultValue;
    }

    /**
     * @type {finite}
     */
    get minValue() {
      return this._.minValue;
    }

    /**
     * @type {finite}
     */
    get maxValue() {
      return this._.maxValue;
    }

    /**
     * @param {finite} value
     * @param {positive} startTime
     * @return {AudioParam}
     */
    setValueAtTime(value, startTime) {
      insertEvent.call(this, this._.timeline, {
        type: "setValueAtTime",
        time: startTime,
        args: [ value, startTime ]
      });
      if (api.get("/AudioParam/setValueAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {finite} value
     * @param {positive} endTime
     * @return {AudioParam}
     */
    linearRampToValueAtTime(value, endTime) {
      insertEvent.call(this, this._.timeline, {
        type: "linearRampToValueAtTime",
        time: endTime,
        args: [ value, endTime ]
      });
      if (api.get("/AudioParam/linearRampToValueAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {finite} value
     * @param {positive} endTime
     * @return {AudioParam}
     */
    exponentialRampToValueAtTime(value, endTime) {
      insertEvent.call(this, this._.timeline, {
        type: "exponentialRampToValueAtTime",
        time: endTime,
        args: [ value, endTime ]
      });
      if (api.get("/AudioParam/exponentialRampToValueAtTime/chain")) {
        return this;
      }
    }

    /**
     * @param {finite} target
     * @param {positive} startTime
     * @param {positive} timeConstant
     * @return {AudioParam}
     */
    setTargetAtTime(target, startTime, timeConstant) {
      insertEvent.call(this, this._.timeline, {
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
      insertEvent.call(this, this._.timeline, {
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
      insertEvent.call(this, this._.timeline, {
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
      insertEvent.call(this, this._.timeline, {
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
     * @type {finite}
     */
    get computedValue() {
      return this._.value;
    }

    /**
     * @deprecated 2012-12-13 - use 'setTargetAtTime(target, startTime, timeConstant)' instead
     * @param {finite} target
     * @param {positive} startTime
     * @param {positive} timeConstant
     * @return {AudioParam}
     */
    setTargetValueAtTime(target, startTime, timeConstant) {
      insertEvent.call(this, this._.timeline, {
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

function insertEvent(timeline, eventItem) {
  const { time } = eventItem;

  if (timeline.length === 0 || timeline[timeline.length - 1].time < time) {
    timeline.push(eventItem);
    return;
  }

  let pos = 0;
  let replace = 0;

  while (pos < timeline.length) {
    if (timeline[pos].time === time && timeline[pos].type === eventItem.type) {
      replace = 1;
      break;
    }
    if (time < timeline[pos].time) {
      break;
    }
    pos += 1;
  }

  timeline.splice(pos, replace, eventItem);
}

module.exports = { create };
