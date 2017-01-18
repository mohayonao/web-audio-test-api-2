"use strict";

const LOWPASS   = "lowpass";
const HIGHPASS  = "highpass";
const BANDPASS  = "bandpass";
const LOWSHELF  = "lowshelf";
const HIGHSHELF = "highshelf";
const PEAKING   = "peaking";
const NOTCH     = "notch";
const ALLPASS   = "allpass";
const values    = [ LOWPASS, HIGHPASS, BANDPASS, LOWSHELF, HIGHSHELF, PEAKING, NOTCH, ALLPASS ];

const BiquadFilterType = {
  LOWPASS, HIGHPASS, BANDPASS, LOWSHELF, HIGHSHELF, PEAKING, NOTCH, ALLPASS,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = BiquadFilterType;
