"use strict";

function create(api, AudioScheduledSourceNode) {
  class AudioBufferSourceNode extends AudioScheduledSourceNode {
    get buffer() {
      void(this);
    }

    set buffer(value) {
      void(this, value);
    }

    get playbackRate() {
      void(this);
    }

    get detune() {
      void(this);
    }

    get loop() {
      void(this);
    }

    set loop(value) {
      void(this, value);
    }

    get loopStart() {
      void(this);
    }

    set loopStart(value) {
      void(this, value);
    }

    get loopEnd() {
      void(this);
    }

    set loopEnd(value) {
      void(this, value);
    }

    start(when = 0, offset = 0, duration = Infinity) {
      void(this, when, offset, duration);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

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

    get gain() {
      void(this);
    }

    get looping() {
      void(this);
    }

    set looping(value) {
      void(this, value);
    }

    noteOn(when) {
      void(this, when);
    }

    noteGrainOn(when, grainOffset, grainDuration) {
      void(this, when, grainOffset, grainDuration);
    }

    noteOff(when) {
      void(this, when);
    }
  }
  return AudioBufferSourceNode;
}

module.exports = { create };
