"use strict";

function stringify(value) {
  if (value === null || value === undefined) {
    return "" + value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return "" + value;
  }
  if (typeof value === "string") {
    return `"${ value }"`;
  }
  if (typeof value === "function") {
    return "function";
  }
  if (value && value._ && value._.className) {
    return value._.className;
  }

  return Object.prototype.toString.call(value).slice(8, -1);
}

module.exports = stringify;
