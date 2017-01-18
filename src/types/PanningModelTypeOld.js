"use strict";

const EQUALPOWER = 0;
const HRTF       = 1;
const SOUNDFIELD = 2;
const values     = [ EQUALPOWER, HRTF, SOUNDFIELD ];

const PanningModelType = {
  EQUALPOWER, HRTF, SOUNDFIELD,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = PanningModelType;
