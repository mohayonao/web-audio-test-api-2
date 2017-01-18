"use strict";

const integer = {
  [Symbol.hasInstance](value) {
    return (value|0) === value;
  }
};

module.exports = integer;
