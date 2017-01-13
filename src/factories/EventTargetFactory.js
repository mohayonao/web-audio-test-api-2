"use strict";

function create(api, BaseObject) {
  class EventTarget extends BaseObject {
    addEventListener(type, eventHandler) {
      void(this, type, eventHandler);
    }

    removeEventListener(type, eventHandler) {
      void(this, type, eventHandler);
    }
  }
  return EventTarget;
}

module.exports = { create };
