"use strict";

const NONE   = "none";
const X2     = "2x";
const X4     = "4x";
const values = [ NONE, X2, X4 ];

const OverSampleType = {
  NONE, X2, X4,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = OverSampleType;
