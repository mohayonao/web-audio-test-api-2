"use strict";

const SINE     = "sine";
const SQUARE   = "square";
const SAWTOOTH = "sawtooth";
const TRIANGLE = "triangle";
const CUSTOM   = "custom";
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
