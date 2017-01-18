"use strict";

const SPEAKERS = "speakers";
const DISCRETE = "discrete";
const values   = [ SPEAKERS, DISCRETE ];

const ChannelInterpretation = {
  SPEAKERS, DISCRETE,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = ChannelInterpretation;
