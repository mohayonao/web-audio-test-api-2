"use strict";

function create(api, AudioNode) {
  class BiquadFilterNode extends AudioNode {
    get type() {
      void(this);
    }

    set type(value) {
      void(this, value);
    }

    get frequency() {
      void(this);
    }

    get detune() {
      void(this);
    }

    get Q() {
      void(this);
    }

    get gain() {
      void(this);
    }

    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      void(this, frequencyHz, magResponse, phaseResponse);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    static get LOWPASS() {
      return api.types.BiquadFilterType.LOWPASS;
    }

    static get HIGHPASS() {
      return api.types.BiquadFilterType.HIGHPASS;
    }

    static get BANDPASS() {
      return api.types.BiquadFilterType.BANDPASS;
    }

    static get LOWSHELF() {
      return api.types.BiquadFilterType.LOWSHELF;
    }

    static get HIGHSHELF() {
      return api.types.BiquadFilterType.HIGHSHELF;
    }

    static get PEAKING() {
      return api.types.BiquadFilterType.PEAKING;
    }

    static get NOTCH() {
      return api.types.BiquadFilterType.NOTCH;
    }

    static get ALLPASS() {
      return api.types.BiquadFilterType.ALLPASS;
    }

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
