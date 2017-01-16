"use strict";

const AudioContextState = require("../types/AudioContextState");
const emit = require("../utils/emit");
const lock = require("../utils/lock");

function create(api, BaseAudioContext) {
  class OfflineAudioContext extends BaseAudioContext {
    /**
     * @param {number} numberOfChannels
     * @param {number} length
     * @param {number} sampleRate
     */
    constructor(numberOfChannels, length, sampleRate) {
      try { lock.unlock()
        super({ numberOfChannels, length, sampleRate });
      } finally { lock.lock(); }

      this._.className = "OfflineAudioContext";
      this._.oncomplete = null;
    }

    /**
     * @type {number}
     */
    get length() {
      return this._.length;
    }

    /**
     * @type {function?}
     */
    get oncomplete() {
      return this._.oncomplete;
    }

    set oncomplete(value) {
      this._.oncomplete = value;
    }

    /**
     * @return {Promise<AudioBuffer>}
     */
    startRendering() {
      return startRendering.call(this, api);
    }

    /**
     * @param {number} suspendTime
     * @return {Promise<void>}
     */
    suspend(suspendTime) {
      void(this, suspendTime);
      return new Promise((resolve) => {
        this._.state = AudioContextState.SUSPENDED;
        emit(this, "statechange");
        resolve();
      });
    }

    /**
     * @return {Promise<void>}
     */
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
