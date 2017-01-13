"use strict";

function mixin(target, source) {
  Object.getOwnPropertyNames(source.prototype).forEach((name) => {
    if (!target.prototype.hasOwnProperty(name)) {
      Object.defineProperty(target.prototype, name, Object.getOwnPropertyDescriptor(source.prototype, name));
    }
  });
  return target;
}

module.exports = mixin;
