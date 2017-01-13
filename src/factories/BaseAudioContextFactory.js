"use strict";

function create(api, EventTarget) {
  class BaseAudioContext extends EventTarget {
    get destination() {
      void(this);
    }

    get sampleRate() {
      void(this);
    }

    get currentTime() {
      void(this);
    }

    get listener() {
      void(this);
    }

    get state() {
      void(this);
    }

    get onstatechange() {
      void(this);
    }

    set onstatechange(value) {
      void(this, value);
    }

    suspend() {
      void(this);
    }

    resume() {
      void(this);
    }

    close() {
      void(this);
    }

    createBuffer(numberOfChannels, length, sampleRate) {
      void(this, numberOfChannels, length, sampleRate);
    }

    decodeAudioData(audioData, successCallback, errorCallback) {
      void(this, audioData, successCallback, errorCallback);
    }

    createBufferSource() {
      void(this);
    }

    createAudioWorker(scriptURL) {
      void(this, scriptURL);
    }

    createConstantSource() {
      void(this);
    }

    createScriptProcessor(bufferSize = 0, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
      void(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
    }

    createAnalyser() {
      void(this);
    }

    createGain() {
      void(this);
    }

    createDelay(maxDelayTime = 1) {
      void(this, maxDelayTime);
    }

    createBiquadFilter() {
      void(this);
    }

    createIIRFilter(feedforward, feedback) {
      void(this, feedforward, feedback);
    }

    createWaveShaper() {
      void(this);
    }

    createPanner() {
      void(this);
    }

    createSpatialPanner() {
      void(this);
    }

    createStereoPanner() {
      void(this);
    }

    createConvolver() {
      void(this);
    }

    createChannelSplitter(numberOfOutputs = 6) {
      void(this, numberOfOutputs);
    }

    createChannelMerger(numberOfInputs = 6) {
      void(this, numberOfInputs);
    }

    createDynamicsCompressor() {
      void(this);
    }

    createOscillator() {
      void(this);
    }

    createPeriodicWave(real, imag, constraints) {
      void(this, real, imag, constraints);
    }

    // In Chrome 55, these methods are defined at BaseAudioContext. ///////////////////////////////

    createMediaElementSource(mediaElement) {
      void(this, mediaElement);
    }

    createMediaStreamSource(mediaStream) {
      void(this, mediaStream);
    }

    createMediaStreamDestination() {
      void(this);
    }
  }
  return BaseAudioContext;
}

module.exports = { create };
