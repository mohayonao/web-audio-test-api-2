"use strict";

function create() {
  class BaseObject {
    constructor() {
      this._ = {};
      this._.className = "BaseObject";
    }
  }
  return BaseObject;
}

module.exports = { create };
