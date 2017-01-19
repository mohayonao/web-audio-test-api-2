"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const BiquadFilterType = require("../types/BiquadFilterType");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

const DEFAULT_TYPE = BiquadFilterType.LOWPASS;
const DEFAULT_FREQUENCY = 350;
const DEFAULT_DETUNE = 0;
const DEFAULT_Q = 1;
const DEFAULT_GAIN = 0;

function create(api, AudioNode) {
  class BiquadFilterNode extends AudioNode {
    /**
     * @protected - use 'audioContext.createBiquadFilter()' instead
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
        name: "BiquadFilter.frequency", defaultValue: DEFAULT_FREQUENCY, value: frequency,
        minValue: 0, maxValue: context.sampleRate / 2
      });
      this._.detune = new api.AudioParam(context, {
        name: "BiquadFilter.detune", defaultValue: DEFAULT_DETUNE, value: detune
      });
      this._.Q = new api.AudioParam(context, {
        name: "BiquadFilter.Q", defaultValue: DEFAULT_Q, value: Q
      });
      this._.gain = new api.AudioParam(context, {
        name: "BiquadFilter.gain", defaultValue: DEFAULT_GAIN, value: gain
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
      if (!(frequencyHz.length === magResponse.length && frequencyHz.length === phaseResponse.length)) {
        throw new TypeError(format(`
          Failed to execute 'getFrequencyResponse' on 'BiquadFilterNode':
          The three parameters must be the same length, but got (${ frequencyHz.length }, ${ magResponse.length }, ${ phaseResponse.length }).
        `));
      }
    }

    /**
     * @deprecated 2012-12-13 - use string ("lowpass") instead
     * @type {BiquadFilterType}
     */
    get LOWPASS() {
      return api.types.BiquadFilterType.LOWPASS;
    }

    /**
     * @deprecated 2012-12-13 - use string ("highpass") instead
     * @type {BiquadFilterType}
     */
    get HIGHPASS() {
      return api.types.BiquadFilterType.HIGHPASS;
    }

    /**
     * @deprecated 2012-12-13 - use string ("bandpass") instead
     * @type {BiquadFilterType}
     */
    get BANDPASS() {
      return api.types.BiquadFilterType.BANDPASS;
    }

    /**
     * @deprecated 2012-12-13 - use string ("lowshelf") instead
     * @type {BiquadFilterType}
     */
    get LOWSHELF() {
      return api.types.BiquadFilterType.LOWSHELF;
    }

    /**
     * @deprecated 2012-12-13 - use string ("highshelf") instead
     * @type {BiquadFilterType}
     */
    get HIGHSHELF() {
      return api.types.BiquadFilterType.HIGHSHELF;
    }

    /**
     * @deprecated 2012-12-13 - use string ("peaking") instead
     * @type {BiquadFilterType}
     */
    get PEAKING() {
      return api.types.BiquadFilterType.PEAKING;
    }

    /**
     * @deprecated 2012-12-13 - use string ("notch") instead
     * @type {BiquadFilterType}
     */
    get NOTCH() {
      return api.types.BiquadFilterType.NOTCH;
    }

    /**
     * @deprecated 2012-12-13 - use string ("allpass") instead
     * @type {BiquadFilterType}
     */
    get ALLPASS() {
      return api.types.BiquadFilterType.ALLPASS;
    }
  }
  return BiquadFilterNode;
}

module.exports = { create };
