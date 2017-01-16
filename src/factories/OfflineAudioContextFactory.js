"use strict";

const AudioContextState = require("../types/AudioContextState");
const emit = require("../utils/emit");
const lock = require("../utils/lock");

function create(api, BaseAudioContext) {
  class OfflineAudioContext extends BaseAudioContext {
    constructor(numberOfChannels, length, sampleRate) {
      lock.unlock()
      super({ numberOfChannels, length, sampleRate });
      lock.lock();

      this._.className = "OfflineAudioContext";
      this._.oncomplete = null;
    }

    get length() {
      return this._.length;
    }

    get oncomplete() {
      return this._.oncomplete;
    }

    set oncomplete(value) {
      this._.oncomplete = value;
    }

    startRendering() {
      return startRendering.call(this, api);
    }

    suspend(suspendTime) {
      void(this, suspendTime);
      return new Promise((resolve) => {
        this._.state = AudioContextState.SUSPENDED;
        emit(this, "statechange");
        resolve();
      });
    }

    resume() {
      return new Promise((resolve) => {
        this._.state = AudioContextState.RUNNING;
        emit(this, "statechange");
        resolve();
      });
    }
  }
  return OfflineAudioContext;
}

function startRendering(api) {
  const promise = new Promise((resolve) => {
    const { numberOfChannels, length, sampleRate } = this._;
    const renderedBuffer = this.createBuffer(numberOfChannels, length|0, sampleRate);

    this._.state = AudioContextState.CLOSED;
    emit(this, "statechange");
    emit(this, "complete", { renderedBuffer });
    resolve(renderedBuffer);
  });

  if (!api.get("/OfflineAudioContext/startRendering/void")) {
    return promise;
  }
}

module.exports = { create, startRendering };
