"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_THRESHOLD = -24;
const DEFAULT_KNEE = 30;
const DEFAULT_RATIO = 12;
const DEFAULT_ATTACK = 0.003;
const DEFAULT_RELEASE = 0.25;

function create(api, AudioNode) {
  class DynamicsCompressorNode extends AudioNode {
    /**
     * @param {AudioContext} context
     * @param {Object} [opts]
     */
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/DynamicsCompressorNode")) {
        throw new TypeError("Illegal constructor");
      }

      /** @type {number} */
      const threshold = defaults(opts.threshold, DEFAULT_THRESHOLD);
      /** @type {number} */
      const knee = defaults(opts.knee, DEFAULT_KNEE);
      /** @type {number} */
      const ratio = defaults(opts.ratio, DEFAULT_RATIO);
      /** @type {number} */
      const attack = defaults(opts.attack, DEFAULT_ATTACK);
      /** @type {number} */
      const release = defaults(opts.release, DEFAULT_RELEASE);
      const reduction = 0;

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 2 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.EXPLICIT,
      });
      lock.lock();

      this._.className = "DynamicsCompressorNode";
      this._.threshold = new api.AudioParam(context, {
        name: "threshold", defaultValue: DEFAULT_THRESHOLD, value: threshold,
        minValue: -100, maxValue: 0
      });
      this._.knee = new api.AudioParam(context, {
        name: "knee", defaultValue: DEFAULT_KNEE, value: knee,
        minValue: 0, maxValue: 40
      });
      this._.ratio = new api.AudioParam(context, {
        name: "ratio", defaultValue: DEFAULT_RATIO, value: ratio,
        minValue: 1, maxValue: 20
      });
      this._.attack = new api.AudioParam(context, {
        name: "attack", defaultValue: DEFAULT_ATTACK, value: attack,
        minValue: 0, maxValue: 1
      });
      this._.release = new api.AudioParam(context, {
        name: "release", defaultValue: DEFAULT_RELEASE, value: release,
        minValue: 0, maxValue: 1
      });
      this._.reduction = new api.AudioParam(context, {
        name: "reduction", defaultValue: reduction, value: reduction
      });
    }

    /**
     * @type {AudioParam}
     */
    get threshold() {
      return this._.threshold;
    }

    /**
     * @type {AudioParam}
     */
    get knee() {
      return this._.knee;
    }

    /**
     * @type {AudioParam}
     */
    get ratio() {
      return this._.ratio;
    }

    /**
     * @type {number}
     */
    get reduction() {
      if (api.get("/DynamicsCompressorNode/reduction/AudioParam")) {
        return this._.reduction;
      }
      return this._.reduction.value;
    }

    /**
     * @type {AudioParam}
     */
    get attack() {
      return this._.attack;
    }

    /**
     * @type {AudioParam}
     */
    get release() {
      return this._.release;
    }
  }
  return DynamicsCompressorNode;
}

module.exports = { create };
