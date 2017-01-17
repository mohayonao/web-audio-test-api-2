"use strict";

const ChannelCountMode = require("../types/ChannelCountMode");
const ChannelInterpretation = require("../types/ChannelInterpretation");
const defaults = require("../utils/defaults");
const lock = require("../utils/lock");

function create(api, EventTarget) {
  class AudioNode extends EventTarget {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {number} opts.channelCount
     * @param {ChannelCountMode} opts.channelCountMode
     * @param {ChannelInterpretation} opts.channelInterpretation
     * @param {object} config
     */
    constructor(context, opts = {}, config = {}) {
      const inputs = defaults(config.inputs, []);
      const outputs = defaults(config.outputs, []);
      const allowedMinChannelCount = defaults(config.allowedMinChannelCount, 1);
      const allowedMaxChannelCount = defaults(config.allowedMaxChannelCount, 32);
      const allowedChannelCountMode = defaults(config.allowedChannelCountMode, [ ChannelCountMode.MAX, ChannelCountMode.CLAMPED_MAX, ChannelCountMode.EXPLICIT ]);
      const allowedChannelInterpretation = defaults(config.allowedChannelInterpretation, [ ChannelInterpretation.DISCRETE, ChannelInterpretation.SPEAKERS ]);
      const channelCount = defaults(opts.channelCount, config.channelCount, 1);
      const channelCountMode = defaults(opts.channelCountMode, config.channelCountMode, ChannelCountMode.MAX);
      const channelInterpretation = defaults(opts.channelInterpretation, config.channelInterpretation, ChannelInterpretation.SPEAKERS);

      try { lock.unlock();
        super(context, opts);
      } finally { lock.lock(); }

      this._.className = "AudioNode";
      this._.context = context;
      this._.inputs = inputs;
      this._.outputs = outputs;
      this._.channelCount = channelCount;
      this._.channelCountMode = channelCountMode;
      this._.channelInterpretation = channelInterpretation;
      this._.allowedMinChannelCount = allowedMinChannelCount;
      this._.allowedMaxChannelCount = allowedMaxChannelCount;
      this._.allowedChannelCountMode = allowedChannelCountMode;
      this._.allowedChannelInterpretation = allowedChannelInterpretation;
    }

    /**
     * @type {AudioContext}
     */
    get context() {
      return this._.context;
    }

    /**
     * @type {number}
     */
    get numberOfInputs() {
      return this._.inputs.length;
    }

    /**
     * @type {number}
     */
    get numberOfOutputs() {
      return this._.outputs.length;
    }

    /**
     * @type {number}
     */
    get channelCount() {
      return this._.channelCount;
    }

    set channelCount(value) {
      this._.channelCount = value;
    }

    /**
     * @type {ChannelCountMode}
     */
    get channelCountMode() {
      return this._.channelCountMode;
    }

    set channelCountMode(value) {
      this._.channelCountMode = value;
    }

    /**
     * @type {ChannelInterpretation}
     */
    get channelInterpretation() {
      return this._.channelInterpretation;
    }

    set channelInterpretation(value) {
      this._.channelInterpretation = value;
    }

    /**
     * @param {AudioNode|AudioParam} destination
     * @param {number} output
     * @param {number} input
     * @return {AudioNode}
     */
    connect(destination, output = 0, input = 0) {
      void(this, destination, output, input);
      if (destination instanceof api.AudioNode) {
        if (!api.get("/AudioNode/connect/void")) {
          return destination;
        }
      }
    }

    disconnect(...args) {
      void(this, args);
    }
  }
  return AudioNode;
}

module.exports = { create };
