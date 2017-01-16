"use strict";

const AudioContextState = require("../types/AudioContextState");
const defaults = require("../utils/defaults");
const emit = require("../utils/emit");
const lock = require("../utils/lock");

const DEFAULT_NUMBER_OF_CHANNELS = 2;
const DEFAULT_SAMPLE_RATE = 44100;

function create(api, EventTarget) {
  class BaseAudioContext extends EventTarget {
    constructor(opts = {}) {
      if (lock.checkIllegalConstructor(api, "/BaseAudioContext")) {
        throw new TypeError("Illegal constructor");
      }

      lock.unlock();
      super();
      initialize.call(this, api, opts);
      lock.lock();
    }

    get destination() {
      return this._.destination;
    }

    get sampleRate() {
      return this._.sampleRate;
    }

    get currentTime() {
      return this._.currentTime;
    }

    get listener() {
      return this._.listener;
    }

    get state() {
      return this._.state;
    }

    get onstatechange() {
      return this._.onstatechange;
    }

    set onstatechange(value) {
      this._.onstatechange = value;
    }

    suspend() {
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

    close() {
      return new Promise((resolve) => {
        this._.state = AudioContextState.CLOSED;
        emit(this, "statechange");
        resolve();
      });
    }

    createBuffer(numberOfChannels, length, sampleRate) {
      return lock.tr(() => new api.AudioBuffer({ numberOfChannels, length, sampleRate }));
    }

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

    createBufferSource() {
      return lock.tr(() => new api.AudioBufferSourceNode(this));
    }

    createAudioWorker(scriptURL) {
      return new Promise((resolve) => {
        resolve(lock.tr(() => new api.AudioWorker(this, { scriptURL })));
      });
    }

    createConstantSource() {
      return lock.tr(() => new api.ConstantSourceNode(this));
    }

    createScriptProcessor(bufferSize = 0, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
      return lock.tr(() => new api.ScriptProcessorNode(this, { bufferSize, numberOfInputChannels, numberOfOutputChannels }));
    }

    createAnalyser() {
      return lock.tr(() => new api.AnalyserNode(this));
    }

    createGain() {
      return lock.tr(() => new api.GainNode(this));
    }

    createDelay(maxDelayTime = 1) {
      return lock.tr(() => new api.DelayNode(this, { maxDelayTime }));
    }

    createBiquadFilter() {
      return lock.tr(() => new api.BiquadFilterNode(this));
    }

    createIIRFilter(feedforward, feedback) {
      return lock.tr(() => new api.IIRFilterNode(this, { feedforward, feedback }));
    }

    createWaveShaper() {
      return lock.tr(() => new api.WaveShaperNode(this));
    }

    createPanner() {
      return lock.tr(() => new api.PannerNode(this));
    }

    createSpatialPanner() {
      return lock.tr(() => new api.SpatialPannerNode(this));
    }

    createStereoPanner() {
      return lock.tr(() => new api.StereoPannerNode(this));
    }

    createConvolver() {
      return lock.tr(() => new api.ConvolverNode(this));
    }

    createChannelSplitter(numberOfOutputs = 6) {
      return lock.tr(() => new api.ChannelSplitterNode(this, { numberOfOutputs }));
    }

    createChannelMerger(numberOfInputs = 6) {
      return lock.tr(() => new api.ChannelMergerNode(this, { numberOfInputs }));
    }

    createDynamicsCompressor() {
      return lock.tr(() => new api.DynamicsCompressorNode(this));
    }

    createOscillator() {
      return lock.tr(() => new api.OscillatorNode(this));
    }

    createPeriodicWave(real, imag, constraints) {
      return lock.tr(() => new api.PeriodicWave(this, { real, imag, constraints }));
    }

    // In Chrome 55, these methods are defined at BaseAudioContext. ///////////////////////////////

    createMediaElementSource(mediaElement) {
      return lock.tr(() => new api.MediaElementAudioSourceNode(this, { mediaElement }));
    }

    createMediaStreamSource(mediaStream) {
      return lock.tr(() => new api.MediaStreamAudioSourceNode(this, { mediaStream }));
    }

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
