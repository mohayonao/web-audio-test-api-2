"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

const DEFAULT_BUFFER_SIZE = 1024;
const DEFAULT_NUMBER_OF_INPUT_CHANNELS = 1;
const DEFAULT_NUMBER_OF_OUTPUT_CHANNELS = 1;

function create(api, AudioNode) {
  class ScriptProcessorNode extends AudioNode {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.bufferSize
     * @param {number} opts.numberOfInputChannels
     * @param {number} opts.numberOfOutputChannels
     */
    constructor(context, opts = {}) {
      const bufferSize = defaults(opts.bufferSize, DEFAULT_BUFFER_SIZE);
      const numberOfInputChannels = defaults(opts.numberOfInputChannels, DEFAULT_NUMBER_OF_INPUT_CHANNELS);
      const numberOfOutputChannels = defaults(opts.numberOfOutputChannels, DEFAULT_NUMBER_OF_OUTPUT_CHANNELS);

      try { lock.unlock();
        super(context, opts, {
          inputs: [ numberOfInputChannels ],
          outputs: [ numberOfOutputChannels ],
          channelCount: numberOfInputChannels,
          channelCountMode: ChannelCountMode.EXPLICIT,
          allowedMaxChannelCount: numberOfInputChannels,
          allowedMinChannelCount: numberOfInputChannels,
          allowedChannelCountMode: [ ChannelCountMode.EXPLICIT ]
        });
      } finally { lock.lock(); }

      this._.className = "ScriptProcessorNode";
      this._.bufferSize = bufferSize;
      this._.onaudioprocess = null;
    }

    /**
     * @type {number}
     */
    get bufferSize() {
      return this._.bufferSize;
    }

    /**
     * @type {function?}
     */
    get onaudioprocess() {
      return this._.onaudioprocess;
    }

    set onaudioprocess(value) {
      this._.onaudioprocess = value;
    }
  }
  return ScriptProcessorNode;
}

module.exports = { create };
