"use strict";

require("run-with-mocha");

const assert = require("assert");
const namespace = require("../../src/api/namespace");

describe("api/namespace", () => {
  describe("apply(api, [ spec ])", () => {
    it("with BaseAudioContext", () => {
      const api = {};
      const spec = { "/BaseAudioContext": true };

      namespace.apply(api, [ spec ]);

      assert(api.BaseObject.isPrototypeOf(api.EventTarget));
      assert(api.EventTarget.isPrototypeOf(api.BaseAudioContext));
      assert(api.BaseAudioContext.isPrototypeOf(api.AudioContext));
      assert(api.BaseAudioContext.isPrototypeOf(api.OfflineAudioContext));
      assert(!api.AudioContext.prototype.hasOwnProperty("createGain"));

      assert(api.EventTarget.isPrototypeOf(api.AudioNode));
    });

    it("without BaseAudioContext", () => {
      const api = {};
      const spec = { "/EventTarget": true };

      namespace.apply(api, [ spec ]);

      assert(api.BaseObject.isPrototypeOf(api.EventTarget));
      assert(!(api.BaseAudioContext.isPrototypeOf(api.AudioContext)));
      assert(!(api.BaseAudioContext.isPrototypeOf(api.OfflineAudioContext)));
      assert(api.EventTarget.isPrototypeOf(api.AudioContext));
      assert(api.AudioContext.isPrototypeOf(api.OfflineAudioContext));
      assert(api.AudioContext.prototype.hasOwnProperty("createGain"));

      assert(api.EventTarget.isPrototypeOf(api.AudioNode));
    });

    it("without EventTarget", () => {
      const api = {};
      const spec = {};

      namespace.apply(api, [ spec ]);

      assert(!(api.EventTarget.isPrototypeOf(api.AudioContext)));
      assert(!(api.EventTarget.isPrototypeOf(api.OfflineAudioContext)));
      assert(api.BaseObject.isPrototypeOf(api.AudioContext));
      assert(api.AudioContext.isPrototypeOf(api.OfflineAudioContext));
      assert(api.AudioContext.prototype.hasOwnProperty("createGain"));

      assert(api.BaseObject.isPrototypeOf(api.AudioNode));
      assert(!(api.EventTarget.isPrototypeOf(api.AudioNode)));
    });

    it("with AudioScheduledSourceNode", () => {
      const api = {};
      const spec = { "/AudioScheduledSourceNode": true, "/AudioSourceNode": true };

      namespace.apply(api, [ spec ]);

      assert(api.AudioNode.isPrototypeOf(api.AudioScheduledSourceNode));
      assert(api.AudioScheduledSourceNode.isPrototypeOf(api.AudioBufferSourceNode));
      assert(api.AudioScheduledSourceNode.isPrototypeOf(api.ConstantSourceNode));
      assert(api.AudioScheduledSourceNode.isPrototypeOf(api.OscillatorNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.MediaElementAudioSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.MediaStreamTrackAudioSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.MediaStreamAudioSourceNode));
      assert(!api.OscillatorNode.prototype.hasOwnProperty("start"));
    });

    it("with AudioSourceNode", () => {
      const api = {};
      const spec = { "/AudioSourceNode": true };

      namespace.apply(api, [ spec ]);

      assert(api.AudioNode.isPrototypeOf(api.AudioSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.AudioBufferSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.ConstantSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.OscillatorNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.MediaElementAudioSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.MediaStreamTrackAudioSourceNode));
      assert(api.AudioSourceNode.isPrototypeOf(api.MediaStreamAudioSourceNode));
      assert(api.OscillatorNode.prototype.hasOwnProperty("start"));
    });

    it("without SourceNode", () => {
      const api = {};
      const spec = {};

      namespace.apply(api, [ spec ]);

      assert(api.AudioNode.isPrototypeOf(api.AudioBufferSourceNode));
      assert(api.AudioNode.isPrototypeOf(api.ConstantSourceNode));
      assert(api.AudioNode.isPrototypeOf(api.OscillatorNode));
      assert(api.AudioNode.isPrototypeOf(api.MediaElementAudioSourceNode));
      assert(api.AudioNode.isPrototypeOf(api.MediaStreamTrackAudioSourceNode));
      assert(api.AudioNode.isPrototypeOf(api.MediaStreamAudioSourceNode));
      assert(api.OscillatorNode.prototype.hasOwnProperty("start"));
    });

    it("class tree", () => {
      const api = {};
      const spec = {};

      namespace.apply(api, [ spec ]);

      assert(api.BaseObject.isPrototypeOf(api.EventTarget));
      assert(api.EventTarget.isPrototypeOf(api.Worker));
      assert(api.EventTarget.isPrototypeOf(api.BaseAudioContext));
      assert(api.BaseObject.isPrototypeOf(api.AudioBuffer));
      assert(api.BaseObject.isPrototypeOf(api.AudioListener));
      assert(api.BaseObject.isPrototypeOf(api.AudioParam));
      assert(api.BaseObject.isPrototypeOf(api.AudioWorker));
      assert(api.BaseObject.isPrototypeOf(api.PeriodicWave));
      assert(api.BaseObject.isPrototypeOf(api.SpatialListener));
      assert(api.AudioNode.isPrototypeOf(api.AudioScheduledSourceNode));
      assert(api.AudioNode.isPrototypeOf(api.AudioSourceNode));
      assert(api.AudioNode.isPrototypeOf(api.AudioDestinationNode));
      assert(api.AudioNode.isPrototypeOf(api.GainNode));
      assert(api.AudioNode.isPrototypeOf(api.DelayNode));
      assert(api.AudioNode.isPrototypeOf(api.AudioWorkerNode));
      assert(api.AudioNode.isPrototypeOf(api.ScriptProcessorNode));
      assert(api.AudioNode.isPrototypeOf(api.PannerNode));
      assert(api.AudioNode.isPrototypeOf(api.SpatialPannerNode));
      assert(api.AudioNode.isPrototypeOf(api.StereoPannerNode));
      assert(api.AudioNode.isPrototypeOf(api.ConvolverNode));
      assert(api.AudioNode.isPrototypeOf(api.AnalyserNode));
      assert(api.AudioNode.isPrototypeOf(api.ChannelSplitterNode));
      assert(api.AudioNode.isPrototypeOf(api.ChannelMergerNode));
      assert(api.AudioNode.isPrototypeOf(api.DynamicsCompressorNode));
      assert(api.AudioNode.isPrototypeOf(api.BiquadFilterNode));
      assert(api.AudioNode.isPrototypeOf(api.IIRFilterNode));
      assert(api.AudioNode.isPrototypeOf(api.WaveShaperNode));
      assert(api.AudioNode.isPrototypeOf(api.MediaStreamAudioDestinationNode));
    });
  });
});
