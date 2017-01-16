"use strict";

/* eslint-disable */
function create(api) {
  class BaseObject {
    constructor() {
      this._ = {};
      this._.className = "BaseObject";
    }
  }
  return BaseObject;
}
/* eslint-enable */

module.exports = { create };
