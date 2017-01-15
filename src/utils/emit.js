"use strict";

function emit(instance, type, ...args) {
  if (typeof instance[`on${ type }`] === "function") {
    instance[`on${ type }`].apply(instance, args);
  }
  if (instance._ && instance._.emitter) {
    instance._.emitter.emit(type, ...args);
  }
}

module.exports = emit;
