"use strict";

const SPEAKERS = "speakers";
const DISCRETE = "discrete";
const values   = [ SPEAKERS, DISCRETE ];

const ChannelInterpretation = {
  SPEAKERS, DISCRETE,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  },
  [Symbol.toStringTag]() {
    return `ChannelInterpretation { ${ values.join(", ") } }`;
  },
};

module.exports = ChannelInterpretation;
