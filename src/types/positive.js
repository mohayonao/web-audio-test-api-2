"use strict";

const positive = {
  [Symbol.hasInstance](value) {
    return typeof value === "number" && 0 <= value;
  }
};

module.exports = positive;
