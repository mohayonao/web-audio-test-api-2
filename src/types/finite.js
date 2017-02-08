"use strict";

const positive = {
  [Symbol.hasInstance](value) {
    return Number.isFinite(value);
  }
};

module.exports = positive;
