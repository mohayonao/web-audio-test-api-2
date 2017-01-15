"use strict";

const SINE     = 0;
const SQUARE   = 1;
const SAWTOOTH = 2;
const TRIANGLE = 3;
const CUSTOM   = 4;
const values   = [ SINE, SQUARE, SAWTOOTH, TRIANGLE ];

const OscillatorType = {
  SINE, SQUARE, SAWTOOTH, TRIANGLE, CUSTOM,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  },
  [Symbol.toStringTag]() {
    return `OscillatorType { ${ values.join(", ") } }`;
  },
};

module.exports = OscillatorType;
