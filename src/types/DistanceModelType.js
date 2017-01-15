"use strict";

const LINEAR      = "linear";
const INVERSE     = "inverse";
const EXPONENTIAL = "exponential";
const values      = [ LINEAR, INVERSE, EXPONENTIAL ];

const DistanceModelType = {
  LINEAR, INVERSE, EXPONENTIAL,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  },
  [Symbol.toStringTag]() {
    return `DistanceModelType { ${ values.join(", ") } }`;
  },
};

module.exports = DistanceModelType;
