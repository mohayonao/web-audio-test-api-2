"use strict";

function create(api, AudioNode) {
  class OscillatorNode extends AudioNode {
    get type() {
      void(this);
    }

    set type(value) {
      void(this, value);
    }

    get frequency() {
      void(this);
    }

    get detune() {
      void(this);
    }

    setPeriodicWave(periodicWave) {
      void(this, periodicWave);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    static get SINE() {
      return api.types.OscillatorType.SINE;
    }

    static get SQUARE() {
      return api.types.OscillatorType.SQUARE;
    }

    static get SAWTOOTH() {
      return api.types.OscillatorType.SAWTOOTH;
    }

    static get TRIANGLE() {
      return api.types.OscillatorType.TRIANGLE;
    }

    static get CUSTOM() {
      return api.types.OscillatorType.CUSTOM;
    }

    static get UNSCHEDULED_STATE() {
      return api.types.PlaybackStateType.UNSCHEDULED_STATE;
    }

    static get SCHEDULED_STATE() {
      return api.types.PlaybackStateType.SCHEDULED_STATE;
    }

    static get PLAYING_STATE() {
      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    static get FINISHED_STATE() {
      return api.types.PlaybackStateType.FINISHED_STATE;
    }

    get SINE() {
      return api.types.OscillatorType.SINE;
    }

    get SQUARE() {
      return api.types.OscillatorType.SQUARE;
    }

    get SAWTOOTH() {
      return api.types.OscillatorType.SAWTOOTH;
    }

    get TRIANGLE() {
      return api.types.OscillatorType.TRIANGLE;
    }

    get CUSTOM() {
      return api.types.OscillatorType.CUSTOM;
    }

    get UNSCHEDULED_STATE() {
      return api.types.PlaybackStateType.UNSCHEDULED_STATE;
    }

    get SCHEDULED_STATE() {
      return api.types.PlaybackStateType.SCHEDULED_STATE;
    }

    get PLAYING_STATE() {
      return api.types.PlaybackStateType.PLAYING_STATE;
    }

    get FINISHED_STATE() {
      return api.types.PlaybackStateType.FINISHED_STATE;
    }

    get playbackState() {
      void(this);
    }

    noteOn(when) {
      void(this, when);
    }

    noteOff(when) {
      void(this, when);
    }

    setWaveTable(waveTable) {
      void(this, waveTable);
    }
  }
  return OscillatorNode;
}

module.exports = { create };
