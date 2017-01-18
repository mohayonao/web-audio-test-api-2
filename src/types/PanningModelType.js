"use strict";

const EQUALPOWER = "equalpower";
const HRTF       = "HRTF";
const values     = [ EQUALPOWER, HRTF ];

const PanningModelType = {
  EQUALPOWER, HRTF,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = PanningModelType;
