"use strict";

const AudioContextState = require("../types/AudioContextState");
const defaults = require("../utils/defaults");
const emit = require("../utils/emit");
const format = require("../utils/format");
const lock = require("../utils/lock");
const stringify = require("../utils/stringify");

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
     * @type {positive}
     */
    get sampleRate() {
      return this._.sampleRate;
    }

    /**
     * @type {positive}
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
      if (this._.state === AudioContextState.CLOSED) {
        throw new TypeError(format(`
          Failed to execute 'suspend' on '${ this._.className }':
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
     * @return {Promise<void>}
     */
    resume() {
      if (this._.state === AudioContextState.CLOSED) {
        throw new TypeError(format(`
          Failed to execute 'suspend' on '${ this._.className }':
          Cannot resume a context that has already been closed.
        `));
      }
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
      if (this._.state === AudioContextState.CLOSED) {
        throw new TypeError(format(`
          Failed to execute 'suspend' on '${ this._.className }':
          Cannot close a context that has already been closed.
        `));
      }
      return new Promise((resolve) => {
        this._.state = AudioContextState.CLOSED;
        emit(this, "statechange");
        resolve();
      });
    }

    createBuffer(...args) {
      if (api.get("/AudioContext/createBuffer/mixToMono") && args[0] instanceof ArrayBuffer) {
        return createBuffer$MixToMono.apply(this, args);
      }
      return createBuffer$Params.apply(this, args);
    }

    /**
     * @todo implements??
     * @deprecated
     * @param {ArrayBuffer} buffer
     * @param {boolean} mixToMono
     * @return {AudioBuffer}
     */
    createBuffer$MixToMono(buffer, mixToMono) {
      const numberOfChannels = 2 - mixToMono;
      const length = buffer.byteLength;
      const sampleRate = this.sampleRate;

      return lock.tr(() => new api.AudioBuffer({ numberOfChannels, length, sampleRate }));
    }

    /**
     * @param {integer} numberOfChannels
     * @param {integer} length
     * @param {positive} sampleRate
     * @return {AudioBuffer}
     */
    createBuffer$Params(numberOfChannels, length, sampleRate) {
      return lock.tr(() => new api.AudioBuffer({ numberOfChannels, length, sampleRate }));
    }

    /**
     * @param {ArrayBuffer} audioData
     * @param {function} [successCallback]
     * @param {function} [errorCallback]
     * @return {Promise<AudioBuffer>}
     */
    decodeAudioData(audioData, successCallback, errorCallback) {
      if (api.get("/AudioContext/decodeAudioData/void")) {
        if (typeof successCallback !== "function") {
          throw new TypeError(format(`
            Failed to execute 'decodeAudioData' on '${ this._.className }':
            The success callback must be function, but got ${ stringify(successCallback) }.
          `));
        }
      }

      function decodeAudioData(result) {
        if (result instanceof api.AudioBuffer) {
          handler.resolve(result);
        } else {
          if (!(result instanceof Error)) {
            result = new Error("decodeAudioDataError");
          }
          handler.reject(result);
        }
      }

      const handler = {};
      const promise = new Promise((resolve, reject) => {
        handler.resolve = resolve;
        handler.reject = reject;
      });

      promise.then(successCallback, errorCallback).catch(() => {});

      if (typeof api.onDecodeAudioData === "function") {
        api.onDecodeAudioData(decodeAudioData, audioData);
      } else {
        const numberOfChannels = this._.numberOfChannels;
        const length = audioData.byteLength;
        const sampleRate = this.sampleRate;
        const audioBuffer = lock.tr(() =>
          new api.AudioBuffer({ numberOfChannels, length, sampleRate })
        );

        decodeAudioData(audioBuffer);
      }

      if (!api.get("/AudioContext/decodeAudioData/void")) {
        return promise;
      } else {
        promise.catch(() => {});
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
     * @param {integer} bufferSize
     * @param {integer} numberOfInputChannels
     * @param {integer} numberOfOutputChannels
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
     * @param {positive} maxDelayTime
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
     * @param {integer} numberOfOutputs
     * @return {ChannelSplitterNode}
     */
    createChannelSplitter(numberOfOutputs = 6) {
      return lock.tr(() => new api.ChannelSplitterNode(this, { numberOfOutputs }));
    }

    /**
     * @param {integer} numberOfInputs
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
    createPeriodicWave(real, imag, constraints = {}) {
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

  // save methods, because these are dropped at the api builder.
  const createBuffer$MixToMono = BaseAudioContext.prototype.createBuffer$MixToMono;
  const createBuffer$Params = BaseAudioContext.prototype.createBuffer$Params;

  return BaseAudioContext;
}

function initialize(api, opts) {
  const numberOfChannels = defaults(opts.numberOfChannels, DEFAULT_NUMBER_OF_CHANNELS);
  const length = defaults(opts.length, Infinity);
  const sampleRate = defaults(opts.sampleRate, DEFAULT_SAMPLE_RATE);

  if (!(1 <= numberOfChannels && numberOfChannels <= 32)) {
    throw new TypeError(format(`
      Failed to construct 'BaseAudioContext':
      The number of channels must be in the range [1, 32], but got ${ numberOfChannels }.
    `));
  }
  if (!(1 <= length)) {
    throw new TypeError(format(`
      Failed to construct 'BaseAudioContext':
      The length must be greater or equal than 1, but got ${ length }.
    `));
  }
  if (!(3000 <= sampleRate && sampleRate <= 192000)) {
    throw new TypeError(format(`
      Failed to construct 'BaseAudioContext':
      The sample rate must be in the range [3000, 192000], but got ${ sampleRate }.
    `));
  }

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
