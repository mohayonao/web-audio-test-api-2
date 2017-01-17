"use strict";

const AudioContextState = require("../types/AudioContextState");
const defaults = require("../utils/defaults");
const emit = require("../utils/emit");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 2;
const DEFAULT_SAMPLE_RATE = 44100;

function create(api, EventTarget) {
  class BaseAudioContext extends EventTarget {
    /**
     * @protected
     * @param {object} opts
     */
    constructor(opts = {}) {
      try { lock.unlock();
        super();
        this._.className = "BaseAudioContext";
        initialize.call(this, api, opts);
      } finally { lock.lock(); }
    }

    /**
     * @type {AudioDestinationNode}
     */
    get destination() {
      return this._.destination;
    }

    /**
     * @type {number}
     */
    get sampleRate() {
      return this._.sampleRate;
    }

    /**
     * @type {number}
     */
    get currentTime() {
      return this._.currentTime;
    }

    /**
     * @type {AudioListener}
     */
    get listener() {
      return this._.listener;
    }

    /**
     * @type {AudioContextState}
     */
    get state() {
      return this._.state;
    }

    /**
     * @type {function?}
     */
    get onstatechange() {
      return this._.onstatechange;
    }

    set onstatechange(value) {
      this._.onstatechange = value;
    }

    /**
     * @return {Promise<void>}
     */
    suspend() {
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

    /**
     * @return {Promise<void>}
     */
    close() {
      return new Promise((resolve) => {
        this._.state = AudioContextState.CLOSED;
        emit(this, "statechange");
        resolve();
      });
    }

    /**
     * @param {number} numberOfChannels
     * @param {number} length
     * @param {number} sampleRate
     * @return {AudioBuffer}
     */
    createBuffer(numberOfChannels, length, sampleRate) {
      return lock.tr(() => new api.AudioBuffer({ numberOfChannels, length, sampleRate }));
    }

    /**
     * @param {ArrayBuffer} audioData
     * @param {function} [successCallback]
     * @param {function} [errorCallback]
     * @return {Promise<AudioBuffer>}
     */
    decodeAudioData(audioData, successCallback, errorCallback) {
      function decodeAudioData(result) {
        /* istanbul ignore else */
        if (!handler.done) {
          handler.done = true;
          if (result instanceof api.AudioBuffer) {
            handler.resolve(result);
          } else {
            if (!(result instanceof Error)) {
              result = new Error("decodeAudioDataError");
            }
            handler.reject(result);
          }
        }
      }

      const handler = {};
      const promise = new Promise((resolve, reject) => {
        handler.resolve = resolve;
        handler.reject = reject;
      });

      promise.then(successCallback, errorCallback).catch(() => {});

      if (api.listenerCount("decodeAudioData")) {
        api.emit("decodeAudioData", decodeAudioData);
      } else {
        decodeAudioData(null);
      }

      if (!api.get("/AudioContext/decodeAudioData/void")) {
        return promise;
      }
    }

    /**
     * @return {AudioBufferSourceNode}
     */
    createBufferSource() {
      return lock.tr(() => new api.AudioBufferSourceNode(this));
    }

    /**
     * @param {string} scriptURL
     * @return {AudioWorker}
     */
    createAudioWorker(scriptURL) {
      return new Promise((resolve) => {
        resolve(lock.tr(() => new api.AudioWorker(this, { scriptURL })));
      });
    }

    /**
     * @return {ConstantSourceNode}
     */
    createConstantSource() {
      return lock.tr(() => new api.ConstantSourceNode(this));
    }

    /**
     * @param {number} bufferSize
     * @param {number} numberOfInputChannels
     * @param {number} numberOfOutputChannels
     * @return {ScriptProcessorNode}
     */
    createScriptProcessor(bufferSize = 0, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
      return lock.tr(() => new api.ScriptProcessorNode(this, { bufferSize, numberOfInputChannels, numberOfOutputChannels }));
    }

    /**
     * @return {AnalyserNode}
     */
    createAnalyser() {
      return lock.tr(() => new api.AnalyserNode(this));
    }

    /**
     * @return {GainNode}
     */
    createGain() {
      return lock.tr(() => new api.GainNode(this));
    }

    /**
     * @param {number} maxDelayTime
     * @return {DelayNode}
     */
    createDelay(maxDelayTime = 1) {
      return lock.tr(() => new api.DelayNode(this, { maxDelayTime }));
    }

    /**
     * @return {BiquadFilterNode}
     */
    createBiquadFilter() {
      return lock.tr(() => new api.BiquadFilterNode(this));
    }

    /**
     * @param {number[]} feedforward
     * @param {number[]} feedback
     * @return {IIRFilterNode}
     */
    createIIRFilter(feedforward, feedback) {
      return lock.tr(() => new api.IIRFilterNode(this, { feedforward, feedback }));
    }

    /**
     * @return {WaveShaperNode}
     */
    createWaveShaper() {
      return lock.tr(() => new api.WaveShaperNode(this));
    }

    /**
     * @return {PannerNode}
     */
    createPanner() {
      return lock.tr(() => new api.PannerNode(this));
    }

    /**
     * @return {SpatialPannerNode}
     */
    createSpatialPanner() {
      return lock.tr(() => new api.SpatialPannerNode(this));
    }

    /**
     * @return {StereoPannerNode}
     */
    createStereoPanner() {
      return lock.tr(() => new api.StereoPannerNode(this));
    }

    /**
     * @return {ConvolverNode}
     */
    createConvolver() {
      return lock.tr(() => new api.ConvolverNode(this));
    }

    /**
     * @param {number} numberOfOutputs
     * @return {ChannelSplitterNode}
     */
    createChannelSplitter(numberOfOutputs = 6) {
      return lock.tr(() => new api.ChannelSplitterNode(this, { numberOfOutputs }));
    }

    /**
     * @param {number} numberOfInputs
     * @return {ChannelMergerNode}
     */
    createChannelMerger(numberOfInputs = 6) {
      return lock.tr(() => new api.ChannelMergerNode(this, { numberOfInputs }));
    }

    /**
     * @return {DynamicsCompressorNode}
     */
    createDynamicsCompressor() {
      return lock.tr(() => new api.DynamicsCompressorNode(this));
    }

    /**
     * @return {OscillatorNode}
     */
    createOscillator() {
      return lock.tr(() => new api.OscillatorNode(this));
    }

    /**
     * @param {Float32Array} real
     * @param {Float32Array} imag
     * @param {object} constraints
     * @return {PeriodicWave}
     */
    createPeriodicWave(real, imag, constraints) {
      return lock.tr(() => new api.PeriodicWave(this, { real, imag, constraints }));
    }

    /**
     * This method is for AudioContext only.
     * But in blink(Chrome55), defined at BaseAudioContext.
     * @param {HTMLMediaElement} mediaElement
     * @return {MediaElementAudioSourceNode}
     */
    createMediaElementSource(mediaElement) {
      return lock.tr(() => new api.MediaElementAudioSourceNode(this, { mediaElement }));
    }

    /**
     * This method is for AudioContext only.
     * But in blink(Chrome55), defined at BaseAudioContext.
     * @param {MediaStream} mediaStream
     * @return {MediaStreamAudioSourceNode}
     */
    createMediaStreamSource(mediaStream) {
      return lock.tr(() => new api.MediaStreamAudioSourceNode(this, { mediaStream }));
    }

    /**
     * This method is for AudioContext only.
     * But in blink(Chrome55), defined at BaseAudioContext.
     * @return {MediaStreamAudioDestinationNode}
     */
    createMediaStreamDestination() {
      return lock.tr(() => new api.MediaStreamAudioDestinationNode(this));
    }
  }
  return BaseAudioContext;
}

function initialize(api, opts) {
  const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);
  const length = defaults(opts.length, Infinity);
  const sampleRate = defaults(opts.sampleRate, DEFAULT_SAMPLE_RATE);

  this._.numberOfChannels = numberOfChannels;
  this._.length = length;
  this._.sampleRate = sampleRate;
  this._.onstatechange = null;
  this._.currentTime = 0;
  this._.destination = new api.AudioDestinationNode(this, { numberOfChannels });
  this._.listener = new api.AudioListener(this);
  this._.state = AudioContextState.SUSPENDED;
}

module.exports = { create, initialize };
