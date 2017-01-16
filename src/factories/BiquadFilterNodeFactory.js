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
    constructor(context, opts = {}) {
      if (lock.checkIllegalConstructor(api, "/BiquadFilterNode")) {
        throw new TypeError("Illegal constructor");
      }

      const type = defaults(opts.type, DEFAULT_TYPE);
      const frequency = defaults(opts.frequency, DEFAULT_FREQUENCY);
      const detune = defaults(opts.detune, DEFAULT_DETUNE);
      const Q = defaults(opts.Q, DEFAULT_Q);
      const gain = defaults(opts.gain, DEFAULT_GAIN);

      lock.unlock();
      super(context, opts, {
        inputs: [ 1 ],
        outputs: [ 1 ],
        channelCount: 2,
        channelCountMode: ChannelCountMode.MAX,
      });
      lock.lock();

      this._.className = "BiquadFilterNode";
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

    get type() {
      return this._.type;
    }

    set type(value) {
      this._.type = value;
    }

    get frequency() {
      return this._.frequency;
    }

    get detune() {
      return this._.detune;
    }

    get Q() {
      return this._.Q;
    }

    get gain() {
      return this._.gain;
    }

    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      void(this, frequencyHz, magResponse, phaseResponse);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get LOWPASS() {
      return api.types.BiquadFilterType.LOWPASS;
    }

    get HIGHPASS() {
      return api.types.BiquadFilterType.HIGHPASS;
    }

    get BANDPASS() {
      return api.types.BiquadFilterType.BANDPASS;
    }

    get LOWSHELF() {
      return api.types.BiquadFilterType.LOWSHELF;
    }

    get HIGHSHELF() {
      return api.types.BiquadFilterType.HIGHSHELF;
    }

    get PEAKING() {
      return api.types.BiquadFilterType.PEAKING;
    }

    get NOTCH() {
      return api.types.BiquadFilterType.NOTCH;
    }

    get ALLPASS() {
      return api.types.BiquadFilterType.ALLPASS;
    }
  }
  return BiquadFilterNode;
}

module.exports = { create };
