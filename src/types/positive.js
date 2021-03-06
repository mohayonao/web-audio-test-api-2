"use strict";

const positive = {
  [Symbol.hasInstance](value) {
    return Number.isFinite(value) && 0 <= value;
  }
};

module.exports = positive;
