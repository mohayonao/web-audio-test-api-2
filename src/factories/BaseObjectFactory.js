"use strict";

function create() {
  class BaseObject {
    constructor() {
      Object.defineProperty(this, "_", {
        value: {}, enumerable: false, writable: false, configurable: false
      });
      this._.className = "BaseObject";
    }
  }
  return BaseObject;
}

module.exports = { create };
