"use strict";

const AudioContextState = require("../types/AudioContextState");
const ChannelCountMode = require("../types/ChannelCountMode");
const ChannelInterpretation = require("../types/ChannelInterpretation");
const defaults = require("../utils/defaults");
const format = require("../utils/format");
const lock = require("../utils/lock");

function create(api, EventTarget) {
  class AudioNode extends EventTarget {
    /**
     * @protected
     * @param {BaseAudioContext} context
     * @param {object} opts
     * @param {integer} opts.channelCount
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
        this._.className = "AudioNode";
      } finally { lock.lock(); }

      if (context.state === AudioContextState.CLOSED) {
        throw new TypeError(format(`
          Failed to construct 'AudioNode':
          AudioContext has been closed.
        `));
      }

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

      this.channelCount = channelCount;
      this.channelCountMode = channelCountMode;
      this.channelInterpretation = channelInterpretation;
    }

    /**
     * @type {AudioContext}
     */
    get context() {
      return this._.context;
    }

    /**
     * @type {integer}
     */
    get numberOfInputs() {
      return this._.inputs.length;
    }

    /**
     * @type {integer}
     */
    get numberOfOutputs() {
      return this._.outputs.length;
    }

    /**
     * @type {integer}
     */
    get channelCount() {
      return this._.channelCount;
    }

    set channelCount(value) {
      if (!(this._.allowedMinChannelCount <= value && value <= this._.allowedMaxChannelCount)) {
        throw new TypeError(format(`
          Failed to set the 'channelCount' property on 'AudioNode':
          The channel count must be in the range [ ${ this._.allowedMinChannelCount }, ${ this._.allowedMaxChannelCount } ], but got ${ value }.
        `));
      }
      this._.channelCount = value;
    }

    /**
     * @type {ChannelCountMode}
     */
    get channelCountMode() {
      return this._.channelCountMode;
    }

    set channelCountMode(value) {
      if (!this._.allowedChannelCountMode.includes(value)) {
        throw new TypeError(format(`
          Failed to set the 'channelCountMode' property on 'AudioNode':
          The channel count mode must be ${ this._.allowedChannelCountMode.join(" or ") }, but got ${ value }.
        `));
      }
      this._.channelCountMode = value;
    }

    /**
     * @type {ChannelInterpretation}
     */
    get channelInterpretation() {
      return this._.channelInterpretation;
    }

    set channelInterpretation(value) {
      if (!this._.allowedChannelInterpretation.includes(value)) {
        throw new TypeError(format(`
          Failed to set the 'channelInterpretation' property on 'AudioNode':
          The channel interpretation must be ${ this._.allowedChannelInterpretation.join(" or ") }, but got ${ value }.
        `));
      }
      this._.channelInterpretation = value;
    }

    /**
     * @param {AudioNode|AudioParam} destination
     * @param {integer} output
     * @param {integer} input
     * @return {AudioNode}
     */
    connect(destination, output = 0, input = 0) {
      if (!(destination._.context === this._.context)) {
        throw new TypeError(format(`
          Failed to execute 'connect' on 'AudioNode':
          Cannot connect to a destination belonging to a different AudioContext.
        `));
      }
      if (!(output < this.numberOfOutputs)) {
        throw new TypeError(format(`
          Failed to execute 'connect' on 'AudioNode':
          The output must be less than number of outputs (${ this.numberOfOutputs }), but got ${ output }.
        `));
      }
      if (destination instanceof api.AudioNode) {
        if (!(input < destination.numberOfInputs)) {
          throw new TypeError(format(`
            Failed to execute 'connect' on 'AudioNode':
            The input must be less than number of destination's inputs (${ destination.numberOfInputs }), but got ${ input }.
          `));
        }
      } else {
        input = 0;
      }

      if (destination instanceof api.AudioNode) {
        if (api.get("/AudioNode/connect/chain")) {
          return destination;
        }
      }
    }

    disconnect(...args) {
      if (api.get("/AudioNode/disconnect/selective")) {
        if (args.length === 0) {
          return disconnect$All.apply(this, args);
        }
        if (typeof args[0] === "number") {
          return disconnect$AllFromOutput.apply(this, args);
        }
        if (args.length === 1) {
          return disconnect$IfConnected.apply(this, args);
        }
        return disconnect$FromOutputIfConnected.apply(this, args);
      }
      return disconnect$AllFromOutput.apply(this, args);
    }

    /**
     * @return {void}
     */
    disconnect$All() {}

    /**
     * @param {integer} output
     * @return {void}
     */
    disconnect$AllFromOutput(output = 0) {
      if (!(output < this.numberOfOutputs)) {
        throw new TypeError(format(`
          Failed to execute 'disconnect' on 'AudioNode':
          The output must be less than number of outputs (${ this.numberOfOutputs }), but got ${ output }.
        `));
      }
    }

    /**
     * @todo check that the destination has been connected.
     * @param {AudioNode|AudioParam} destination
     * @return {void}
     */
    disconnect$IfConnected(destination) {
      void(this, destination);
    }

    /**
     * @todo check that the destination has been connected.
     * @param {AudioNode|AudioParam} destination
     * @param {integer} output
     * @param {integer} input
     * @return {void}
     */
    disconnect$FromOutputIfConnected(destination, output = 0, input = 0) {
      if (!(output < this.numberOfOutputs)) {
        throw new TypeError(format(`
          Failed to execute 'disconnect' on 'AudioNode':
          The output must be less than number of outputs (${ this.numberOfOutputs }), but got ${ output }.
        `));
      }
      if (destination instanceof api.AudioNode) {
        if (!(input < destination.numberOfInputs)) {
          throw new TypeError(format(`
            Failed to execute 'disconnect' on 'AudioNode':
            The input must be less than number of destination's inputs (${ destination.numberOfInputs }), but got ${ input }.
          `));
        }
      } else {
        input = 0;
      }
    }
  }

  // save methods, because these are dropped at the api builder.
  const disconnect$All = AudioNode.prototype.disconnect$All;
  const disconnect$AllFromOutput = AudioNode.prototype.disconnect$AllFromOutput;
  const disconnect$IfConnected = AudioNode.prototype.disconnect$IfConnected;
  const disconnect$FromOutputIfConnected = AudioNode.prototype.disconnect$FromOutputIfConnected;

  return AudioNode;
}

module.exports = { create };
