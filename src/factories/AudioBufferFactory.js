"use strict";

function create(api, BaseObject) {
  class AudioBuffer extends BaseObject {
    get sampleRate() {
      void(this);
    }

    get length() {
      void(this);
    }

    get duration() {
      void(this);
    }

    get numberOfChannels() {
      void(this);
    }

    getChannelData(channel) {
      void(this, channel);
    }

    copyFromChannel(destination, channelNumber, startInChannel = 0) {
      void(this, destination, channelNumber, startInChannel);
    }

    copyToChannel(source, channelNumber, startInChannel = 0) {
      void(this, source, channelNumber, startInChannel);
    }

    // Ancient properties /////////////////////////////////////////////////////////////////////////

    get gain() {
      void(this);
    }

    set gain(value) {
      void(this, value);
    }
  }
  return AudioBuffer;
}

module.exports = { create };
