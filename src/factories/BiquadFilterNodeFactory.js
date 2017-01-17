"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const BiquadFilterType = require("../types/BiquadFilterType");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_TYPE = BiquadFilterType.LOWPASS;
const DEFAULT_FREQUENCY = 350;
const DEFAULT_DETUNE = 0;
const DEFAULT_Q = 1;
const DEFAULT_GAIN = 0;

function create(api, AudioNode) {
  class BiquadFilterNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {BiquadFilterType} opts.type
     * @param {number} opts.frequency
     * @param {number} opts.detune
     * @param {number} opts.Q
     * @param {number} opts.gain
     */
    constructor(context, opts = {}) {
      const type = defaults(opts.type, DEFAULT_TYPE);
      const frequency = defaults(opts.frequency, DEFAULT_FREQUENCY);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const Q = defaults(opts.Q, DEFAULT_Q);
      const gain = defaults(opts.gain, DEFAULT_GAIN);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ 1 ],
          outputs: [ 1 ],
          channelCount: 2,
          channelCountMode: ChannelCountMode.MAX,
        });
        this._.className = "BiquadFilterNode";
      } finally { lock.lock(); }

      this._.type = type;
      this._.frequency = new api.AudioParam(context, {
        name: "frequency", defaultValue: DEFAULT_FREQUENCY, value: frequency,
        minValue: 0, maxValue: context.sampleRate / 2
      });
      this._.detune = new api.AudioParam(context, {
        name: "detune", defaultValue: DEFAULT_DETUNE, value: detune
      });
      this._.Q = new api.AudioParam(context, {
        name: "Q", defaultValue: DEFAULT_Q, value: Q
      });
      this._.gain = new api.AudioParam(context, {
        name: "gain", defaultValue: DEFAULT_GAIN, value: gain
      });
    }

    /**
     * @type {BiquadFilterType}
     */
    get type() {
      return this._.type;
    }

    set type(value) {
      this._.type = value;
    }

    /**
     * @type {AudioParam}
     */
    get frequency() {
      return this._.frequency;
    }

    /**
     * @type {AudioParam}
     */
    get detune() {
      return this._.detune;
    }

    /**
     * @type {AudioParam}
     */
    get Q() {
      return this._.Q;
    }

    /**
     * @type {AudioParam}
     */
    get gain() {
      return this._.gain;
    }

    /**
     * @param {Float32Array} frequencyHz
     * @param {Float32Array} magResponse
     * @param {Float32Array} phaseResponse
     * @return {void}
     */
    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      void(this, frequencyHz, magResponse, phaseResponse);
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get LOWPASS() {
      return api.types.BiquadFilterType.LOWPASS;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get HIGHPASS() {
      return api.types.BiquadFilterType.HIGHPASS;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get BANDPASS() {
      return api.types.BiquadFilterType.BANDPASS;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get LOWSHELF() {
      return api.types.BiquadFilterType.LOWSHELF;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get HIGHSHELF() {
      return api.types.BiquadFilterType.HIGHSHELF;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get PEAKING() {
      return api.types.BiquadFilterType.PEAKING;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get NOTCH() {
      return api.types.BiquadFilterType.NOTCH;
    }

    /**
     * @deprecated
     * @type {BiquadFilterType}
     */
    get ALLPASS() {
      return api.types.BiquadFilterType.ALLPASS;
    }
  }
  return BiquadFilterNode;
}

module.exports = { create };
