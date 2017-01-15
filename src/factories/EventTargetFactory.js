"use strict";

const { EventEmitter } = require("events");

function create(api, BaseObject) {
  class EventTarget extends BaseObject {
    constructor() {
      super();
      this._.emitter = new EventEmitter();
    }

    addEventListener(type, eventHandler) {
      this._.emitter.addListener(type, eventHandler);
    }

    removeEventListener(type, eventHandler) {
      this._.emitter.removeListener(type, eventHandler);
    }
  }
  return EventTarget;
}

module.exports = { create };
