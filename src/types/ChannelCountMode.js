"use strict";

const MAX         = "max";
const CLAMPED_MAX = "clamped-max";
const EXPLICIT    = "explicit";
const values      = [ MAX, CLAMPED_MAX, EXPLICIT ];

const ChannelCountMode = {
  MAX, CLAMPED_MAX, EXPLICIT,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  },
  [Symbol.toStringTag]() {
    return `ChannelCountMode { ${ values.join(", ") } }`;
  },
};

module.exports = ChannelCountMode;
