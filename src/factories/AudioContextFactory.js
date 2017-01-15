"use strict";

const AudioContextState = require("../types/AudioContextState");
const defaults = require("../utils/defaults");
const emit = require("../utils/emit");
const lock = require("../utils/lock");
const { initialize } = require("./BaseAudioContextFactory");
const { startRendering } = require("./OfflineAudioContextFactory");

const DEFAULT_NUMBER_OF_CHANNELS = 2;
const DEFAULT_SAMPLE_RATE = 44100;

function create(api, BaseAudioContext) {
  class AudioContext extends BaseAudioContext {
    constructor() {
      const numberOfChannels = defaults(api.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);
      const sampleRate = defaults(api.sampleRate, DEFAULT_SAMPLE_RATE);

      lock.unlock();
      super({ numberOfChannels, sampleRate });
      if (!(this instanceof api.BaseAudioContext)) {
        initialize.call(this, api, { numberOfChannels, sampleRate });
      }
      lock.lock();

      this._.className = "AudioContext";
      this._.state = AudioContextState.RUNNING;
      this._.oncomplete = null;
    }

    get baseLatency() {
      return 2 * 128 / this._.sampleRate;
    }

    get outputLatency() {
      return 0;
    }

    getOutputTimestamp() {
      const contextTime = this.currentTime + 0.01795;
      const performanceTime = contextTime + 1000;

      return { contextTime, performanceTime };
    }

    close() {
      return new Promise((resolve) => {
        this._.state = AudioContextState.CLOSED;
        emit(this, "statechange");
        resolve();
      });
    }

    suspend() {
      return new Promise((resolve) => {
        this._.state = AudioContextState.SUSPENDED;
        emit(this, "statechange");
        resolve();
      });
    }

    createMediaElementSource(mediaElement) {
      return lock.tr(() => new api.MediaElementAudioSourceNode(this, { mediaElement }));
    }

    createMediaStreamSource(mediaStream) {
      return lock.tr(() => new api.MediaStreamAudioSourceNode(this, { mediaStream }));
    }

    createMediaStreamTrackSource(mediaStreamTrack) {
      return lock.tr(() => new api.MediaStreamTrackAudioSourceNode(this, { mediaStreamTrack }));
    }

    createMediaStreamDestination() {
      return lock.tr(() => new api.MediaStreamAudioDestinationNode(this));
    }

    // OfflineAudioContext ////////////////////////////////////////////////////////////////////////

    get oncomplete() {
      return this._.oncomplete;
    }

    set oncomplete(value) {
      this._.oncomplete = value;
    }

    startRendering() {
      return startRendering.call(this, api);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get activeSourceCount() {
      return 0;
    }

    createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      return lock.tr(() => new api.ScriptProcessorNode(this, { bufferSize, numberOfInputChannels, numberOfOutputChannels }));
    }

    createGainNode() {
      return lock.tr(() => new api.GainNode(this));
    }

    createDelayNode(maxDelayTime = 1) {
      return lock.tr(() => new api.DelayNode(this, { maxDelayTime }));
    }

    createWaveTable(real, imag) {
      return lock.tr(() => new api.PeriodicWave(this, { real, imag }));
    }
  }
  return AudioContext;
}

module.exports = { create };
