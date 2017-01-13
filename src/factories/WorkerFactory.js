"use strict";

function create(api, EventTarget) {
  class Worker extends EventTarget {
    get onmessage() {
      void(this);
    }

    set onmessage(value) {
      void(this, value);
    }

    get onerror() {
      void(this);
    }

    set onerror(value) {
      void(this, value);
    }

    terminate() {
      void(this);
    }

    postMessage(message, transfer) {
      void(this, message, transfer);
    }
  }
  return Worker;
}

module.exports = { create };
