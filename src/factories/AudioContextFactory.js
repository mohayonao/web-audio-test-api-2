"use strict";

const AudioContextState = require("../types/AudioContextState");
const defaults = require("../utils/defaults");
const emit = require("../utils/emit");
const format = require("../utils/format");
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

      try { lock.unlock();
        super({ numberOfChannels, sampleRate });
        this._.className = "AudioContext";
        if (!(this instanceof api.BaseAudioContext)) {
          initialize.call(this, api, { numberOfChannels, sampleRate });
        }
      } finally { lock.lock(); }

      this._.state = AudioContextState.RUNNING;
      this._.oncomplete = null;
    }

    /**
     * @type {positive}
     */
    get baseLatency() {
      return 2 * 128 / this._.sampleRate;
    }

    /**
     * @type {positive}
     */
    get outputLatency() {
      return 0;
    }

    /**
     * @return {object}
     */
    getOutputTimestamp() {
      const contextTime = this.currentTime + 0.01795;
      const performanceTime = contextTime + 1000;

      return { contextTime, performanceTime };
    }

    /**
     * @return {Promise<void>}
     */
    close() {
      if (this._.state === AudioContextState.CLOSED) {
        throw new TypeError(format(`
          Failed to execute 'close' on 'AudioContext':
          Cannot close a context that has already been closed.
        `));
      }
      return new Promise((resolve) => {
        this._.state = AudioContextState.CLOSED;
        emit(this, "statechange");
        resolve();
      });
    }

    /**
     * @return {Promise<void>}
     */
    suspend() {
      if (this._.state === AudioContextState.CLOSED) {
        throw new TypeError(format(`
          Failed to execute 'suspend' on 'AudioContext':
          Cannot suspend a context that has already been closed.
        `));
      }
      return new Promise((resolve) => {
        this._.state = AudioContextState.SUSPENDED;
        emit(this, "statechange");
        resolve();
      });
    }

    /**
     * @param {HTMLMediaElement} mediaElement
     * @return {MediaElementAudioSourceNode}
     */
    createMediaElementSource(mediaElement) {
      return lock.tr(() => new api.MediaElementAudioSourceNode(this, { mediaElement }));
    }

    /**
     * @param {MediaStream} mediaStream
     * @return {MediaStreamAudioSourceNode}
     */
    createMediaStreamSource(mediaStream) {
      return lock.tr(() => new api.MediaStreamAudioSourceNode(this, { mediaStream }));
    }

    /**
     * @param {AudioMediaStreamTrack} mediaStreamTrack
     * @return {MediaStreamTrackAudioSourceNode}
     */
    createMediaStreamTrackSource(mediaStreamTrack) {
      return lock.tr(() => new api.MediaStreamTrackAudioSourceNode(this, { mediaStreamTrack }));
    }

    /**
     * @return {MediaStreamAudioDestinationNode}
     */
    createMediaStreamDestination() {
      return lock.tr(() => new api.MediaStreamAudioDestinationNode(this));
    }

    /**
     * This property is for OfflineAudioContext only.
     * But in webkit(Safari10), defined at AudioContext.
     * @type {function?}
     */
    get oncomplete() {
      return this._.oncomplete;
    }

    set oncomplete(value) {
      this._.oncomplete = value;
    }

    /**
     * This method is for OfflineAudioContext only.
     * But in webkit(Safari10), defined at AudioContext.
     * @return {Promise<void>}
     */
    startRendering() {
      return startRendering.call(this, api);
    }

    /**
     * @deprecated 2013-10-10
     * @type {integer}
     */
    get activeSourceCount() {
      return 0;
    }

    /**
     * @deprecated 2012-12-13 createScriptProcessor(bufferSize, [numberOfInputChannels, numberOfOutputChannels])
     * @param {integer} bufferSize
     * @param {integer} numberOfInputChannels
     * @param {integer} numberOfOutputChannels
     * @return {ScriptProcessorNode}
     */
    createJavaScriptNode(bufferSize = 0, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
      return lock.tr(() => new api.ScriptProcessorNode(this, { bufferSize, numberOfInputChannels, numberOfOutputChannels }));
    }

    /**
     * @deprecated 2012-12-13 createGain()
     * @return {GainNode}
     */
    createGainNode() {
      return lock.tr(() => new api.GainNode(this));
    }

    /**
     * @deprecated 2012-12-13 createDelay([maxDelayTime])
     * @param {positive} maxDelayTime
     * @return {DelayNode}
     */
    createDelayNode(maxDelayTime = 1) {
      return lock.tr(() => new api.DelayNode(this, { maxDelayTime }));
    }

    /**
     * @deprecated 2013-10-10 createPeriodicWave(real, imag)
     * @param {Float32Array} real
     * @param {Float32Array} imag
     * @return {PeriodicWave}
     */
    createWaveTable(real, imag) {
      return lock.tr(() => new api.PeriodicWave(this, { real, imag }));
    }
  }
  return AudioContext;
}

module.exports = { create };
