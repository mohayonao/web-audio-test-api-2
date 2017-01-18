"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

const DEFAULT_BUFFER_SIZE = 1024;
const DEFAULT_NUMBER_OF_INPUT_CHANNELS = 1;
const DEFAULT_NUMBER_OF_OUTPUT_CHANNELS = 1;

function create(api, AudioNode) {
  class ScriptProcessorNode extends AudioNode {
    /**
     * @protected - audioContext.createScriptProcessor(bufferSize, [numberOfInputs, numberOfOutputs])
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {integer} opts.bufferSize
     * @param {integer} opts.numberOfInputChannels
     * @param {integer} opts.numberOfOutputChannels
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
        this._.className = "ScriptProcessorNode";
      } finally { lock.lock(); }

      if (!([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].includes(bufferSize))) {
        throw new TypeError(format(`
          Failed to construct 'ScriptProcessorNode':
          The buffer size must be values (256, 512, 1024, 2048, 4096, 8192, 16384), but got ${ bufferSize }.
        `));
      }
      if (!(0 <= numberOfInputChannels && numberOfInputChannels <= 32)) {
        throw new TypeError(format(`
          Failed to construct 'ScriptProcessorNode':
          The number of input channels must be in the range [0, 32], but got ${ numberOfInputChannels }.
        `));
      }
      if (!(0 <= numberOfOutputChannels && numberOfOutputChannels <= 32)) {
        throw new TypeError(format(`
          Failed to construct 'ScriptProcessorNode':
          The number of output channels must be in the range [0, 32], but got ${ numberOfOutputChannels }.
        `));
      }
      if (!(numberOfInputChannels !== 0 && numberOfOutputChannels !== 0)) {
        throw new TypeError(format(`
          Failed to construct 'ScriptProcessorNode':
          The number of input channels and number of output channels cannot both be zero.
        `));
      }

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
