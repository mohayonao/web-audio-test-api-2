"use strict";

function create(api, BaseAudioContext) {
  class OfflineAudioContext extends BaseAudioContext {
    get length() {
      void(this);
    }

    get oncomplete() {
      void(this);
    }

    set oncomplete(value) {
      void(this, value);
    }

    startRendering() {
      void(this);
    }

    suspend(suspendTime) {
      void(this, suspendTime);
    }

    resume() {
      void(this);
    }

    close() {
      void(this);
    }
  }
  return OfflineAudioContext;
}

module.exports = { create };
