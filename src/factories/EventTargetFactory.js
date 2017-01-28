"use strict";

const { EventEmitter } = require("events");

function create(api, BaseObject) {
  class EventTarget extends BaseObject {
    constructor() {
      super();
      this._.emitter = new EventEmitter();
    }

    /**
     * @param {string} type
     * @param {function} eventHandler
     * @return {void}
     */
    addEventListener(type, eventHandler) {
      this._.emitter.addListener(type, eventHandler);
    }

    /**
     * @param {object} event
     * @return {void}
     */
    dispatchEvent(event) {
      void(this, event);
    }

    /**
     * @param {string} type
     * @param {function} eventHandler
     * @return {void}
     */
    removeEventListener(type, eventHandler) {
      this._.emitter.removeListener(type, eventHandler);
    }
  }
  return EventTarget;
}

module.exports = { create };
