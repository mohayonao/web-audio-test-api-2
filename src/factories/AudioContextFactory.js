"use strict";

function create(api, BaseAudioContext) {
  class AudioContext extends BaseAudioContext {
    get baseLatency() {
      void(this);
    }

    get outputLatency() {
      void(this);
    }

    getOutputTimestamp() {
      void(this);
    }

    close() {
      void(this);
    }

    suspend() {
      void(this);
    }

    createMediaElementSource(mediaElement) {
      void(this, mediaElement);
    }

    createMediaStreamSource(mediaStream) {
      void(this, mediaStream);
    }

    createMediaStreamTrackSource(mediaStreamTrack) {
      void(this, mediaStreamTrack);
    }

    createMediaStreamDestination() {
      void(this);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get activeSourceCount() {
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

    createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      void(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
    }

    createGainNode() {
      void(this);
    }

    createDelayNode() {
      void(this);
    }

    createWaveTable(real, imag) {
      void(this, real, imag);
    }
  }
  return AudioContext;
}

module.exports = { create };
