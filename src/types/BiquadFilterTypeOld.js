"use strict";

const LOWPASS   = 0;
const HIGHPASS  = 1;
const BANDPASS  = 2;
const LOWSHELF  = 3;
const HIGHSHELF = 4;
const PEAKING   = 5;
const NOTCH     = 6;
const ALLPASS   = 7;
const values    = [ LOWPASS, HIGHPASS, BANDPASS, LOWSHELF, HIGHSHELF, PEAKING, NOTCH, ALLPASS ];

const BiquadFilterType = {
  LOWPASS, HIGHPASS, BANDPASS, LOWSHELF, HIGHSHELF, PEAKING, NOTCH, ALLPASS,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  },
  [Symbol.toStringTag]() {
    return `BiquadFilterType { ${ values.join(", ") } }`;
  },
};

module.exports = BiquadFilterType;
