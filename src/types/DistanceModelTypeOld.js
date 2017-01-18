"use strict";

const LINEAR_DISTANCE      = 0;
const INVERSE_DISTANCE     = 1;
const EXPONENTIAL_DISTANCE = 2;
const values               = [ LINEAR_DISTANCE, INVERSE_DISTANCE, EXPONENTIAL_DISTANCE ];

const DistanceModelType = {
  LINEAR_DISTANCE, INVERSE_DISTANCE, EXPONENTIAL_DISTANCE,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = DistanceModelType;
