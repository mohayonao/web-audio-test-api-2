"use strict";

function defaults(...args) {
  for (let i = 0, imax = args.length; i < imax; i++) {
    if (typeof args[i] !== "undefined") {
      return args[i];
    }
  }
  return null;
}

module.exports = defaults;
