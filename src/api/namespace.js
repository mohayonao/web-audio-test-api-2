"use strict";

const BaseObjectFactory = require("../factories/BaseObjectFactory");
const EventTargetFactory = require("../factories/EventTargetFactory");
const WorkerFactory = require("../factories/WorkerFactory");
const BaseAudioContextFactory = require("../factories/BaseAudioContextFactory");
const AudioContextFactory = require("../factories/AudioContextFactory");
const OfflineAudioContextFactory = require("../factories/OfflineAudioContextFactory");
const AudioBufferFactory = require("../factories/AudioBufferFactory");
const AudioParamFactory = require("../factories/AudioParamFactory");
const AudioWorkerFactory = require("../factories/AudioWorkerFactory");
const PeriodicWaveFactory = require("../factories/PeriodicWaveFactory");
const SpatialListenerFactory = require("../factories/SpatialListenerFactory");
const AudioListenerFactory = require("../factories/AudioListenerFactory");
const AudioNodeFactory = require("../factories/AudioNodeFactory");
const AudioScheduledSourceNodeFactory = require("../factories/AudioScheduledSourceNodeFactory");
const AudioSourceNodeFactory = require("../factories/AudioSourceNodeFactory");
const AudioDestinationNodeFactory = require("../factories/AudioDestinationNodeFactory");
const GainNodeFactory = require("../factories/GainNodeFactory");
const DelayNodeFactory = require("../factories/DelayNodeFactory");
const AudioWorkerNodeFactory = require("../factories/AudioWorkerNodeFactory");
const ScriptProcessorNodeFactory = require("../factories/ScriptProcessorNodeFactory");
const SpatialPannerNodeFactory = require("../factories/SpatialPannerNodeFactory");
const PannerNodeFactory = require("../factories/PannerNodeFactory");
const StereoPannerNodeFactory = require("../factories/StereoPannerNodeFactory");
const ConvolverNodeFactory = require("../factories/ConvolverNodeFactory");
const AnalyserNodeFactory = require("../factories/AnalyserNodeFactory");
const ChannelSplitterNodeFactory = require("../factories/ChannelSplitterNodeFactory");
const ChannelMergerNodeFactory = require("../factories/ChannelMergerNodeFactory");
const DynamicsCompressorNodeFactory = require("../factories/DynamicsCompressorNodeFactory");
const BiquadFilterNodeFactory = require("../factories/BiquadFilterNodeFactory");
const IIRFilterNodeFactory = require("../factories/IIRFilterNodeFactory");
const WaveShaperNodeFactory = require("../factories/WaveShaperNodeFactory");
const MediaStreamAudioDestinationNodeFactory = require("../factories/MediaStreamAudioDestinationNodeFactory");
const AudioBufferSourceNodeFactory = require("../factories/AudioBufferSourceNodeFactory");
const ConstantSourceNodeFactory = require("../factories/ConstantSourceNodeFactory");
const OscillatorNodeFactory = require("../factories/OscillatorNodeFactory");
const MediaElementAudioSourceNodeFactory = require("../factories/MediaElementAudioSourceNodeFactory");
const MediaStreamAudioSourceNodeFactory = require("../factories/MediaStreamAudioSourceNodeFactory");
const MediaStreamTrackAudioSourceNodeFactory = require("../factories/MediaStreamTrackAudioSourceNodeFactory");
const HTMLMediaElementFactory = require("../factories/HTMLMediaElementFactory");
const MediaStreamFactory = require("../factories/MediaStreamFactory");
const AudioMediaStreamTrackFactory = require("../factories/AudioMediaStreamTrackFactory");

const mixin = require("../utils/mixin");

function apply(api, [ spec ]) {
  api.BaseObject = BaseObjectFactory.create(api);
  api.EventTarget = EventTargetFactory.create(api, api.BaseObject);
  api.Worker = WorkerFactory.create(api, api.EventTarget);
  api.BaseAudioContext = BaseAudioContextFactory.create(api, api.EventTarget);

  if (spec["/BaseAudioContext"]) {
    api.AudioContext = AudioContextFactory.create(api, api.BaseAudioContext);
    api.OfflineAudioContext = OfflineAudioContextFactory.create(api, api.BaseAudioContext);
  } else {
    api.AudioContext = mixin(AudioContextFactory.create(api, api.EventTarget), api.BaseAudioContext);
    api.OfflineAudioContext = OfflineAudioContextFactory.create(api, api.AudioContext);
  }

  api.AudioBuffer = AudioBufferFactory.create(api, api.BaseObject);
  api.AudioParam = AudioParamFactory.create(api, api.BaseObject);
  api.AudioWorker = AudioWorkerFactory.create(api, api.Worker);
  api.PeriodicWave = PeriodicWaveFactory.create(api, api.BaseObject);
  api.SpatialListener = SpatialListenerFactory.create(api, api.BaseObject);
  api.AudioListener = mixin(AudioListenerFactory.create(api, api.BaseObject), api.SpatialListener);
  api.AudioNode = AudioNodeFactory.create(api, api.EventTarget);
  api.AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create(api, api.AudioNode);
  api.AudioSourceNode = AudioSourceNodeFactory.create(api, api.AudioNode);

  api.AudioDestinationNode = AudioDestinationNodeFactory.create(api, api.AudioNode);
  api.GainNode = GainNodeFactory.create(api, api.AudioNode);
  api.DelayNode = DelayNodeFactory.create(api, api.AudioNode);
  api.AudioWorkerNode = AudioWorkerNodeFactory.create(api, api.AudioNode);
  api.ScriptProcessorNode = ScriptProcessorNodeFactory.create(api, api.AudioNode);
  api.SpatialPannerNode = SpatialPannerNodeFactory.create(api, api.AudioNode);
  api.PannerNode = mixin(PannerNodeFactory.create(api, api.AudioNode), api.SpatialPannerNode);
  api.StereoPannerNode = StereoPannerNodeFactory.create(api, api.AudioNode);
  api.ConvolverNode = ConvolverNodeFactory.create(api, api.AudioNode);
  api.AnalyserNode = AnalyserNodeFactory.create(api, api.AudioNode);
  api.ChannelSplitterNode = ChannelSplitterNodeFactory.create(api, api.AudioNode);
  api.ChannelMergerNode = ChannelMergerNodeFactory.create(api, api.AudioNode);
  api.DynamicsCompressorNode = DynamicsCompressorNodeFactory.create(api, api.AudioNode);
  api.BiquadFilterNode = BiquadFilterNodeFactory.create(api, api.AudioNode);
  api.IIRFilterNode = IIRFilterNodeFactory.create(api, api.AudioNode);
  api.WaveShaperNode = WaveShaperNodeFactory.create(api, api.AudioNode);
  api.MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNodeFactory.create(api, api.AudioNode);
  api.HTMLMediaElement = HTMLMediaElementFactory.create(api, api.BaseObject);
  api.MediaStream = MediaStreamFactory.create(api, api.BaseObject);
  api.AudioMediaStreamTrack = AudioMediaStreamTrackFactory.create(api, api.BaseObject);

  if (spec["/AudioScheduledSourceNode"]) {
    api.AudioBufferSourceNode = AudioBufferSourceNodeFactory.create(api, api.AudioScheduledSourceNode);
    api.ConstantSourceNode = ConstantSourceNodeFactory.create(api, api.AudioScheduledSourceNode);
    api.OscillatorNode = OscillatorNodeFactory.create(api, api.AudioScheduledSourceNode);
  } else if (spec["/AudioSourceNode"]) {
    api.AudioBufferSourceNode = mixin(AudioBufferSourceNodeFactory.create(api, api.AudioSourceNode), api.AudioScheduledSourceNode);
    api.ConstantSourceNode = mixin(ConstantSourceNodeFactory.create(api, api.AudioSourceNode), api.AudioScheduledSourceNode);
    api.OscillatorNode = mixin(OscillatorNodeFactory.create(api, api.AudioSourceNode), api.AudioScheduledSourceNode);
  } else {
    api.AudioBufferSourceNode = mixin(AudioBufferSourceNodeFactory.create(api, api.AudioNode), api.AudioScheduledSourceNode);
    api.ConstantSourceNode = mixin(ConstantSourceNodeFactory.create(api, api.AudioNode), api.AudioScheduledSourceNode);
    api.OscillatorNode = mixin(OscillatorNodeFactory.create(api, api.AudioNode), api.AudioScheduledSourceNode);
  }

  if (spec["/AudioSourceNode"]) {
    api.MediaElementAudioSourceNode = MediaElementAudioSourceNodeFactory.create(api, api.AudioSourceNode);
    api.MediaStreamTrackAudioSourceNode = MediaStreamTrackAudioSourceNodeFactory.create(api, api.AudioSourceNode);
    api.MediaStreamAudioSourceNode = MediaStreamAudioSourceNodeFactory.create(api, api.AudioSourceNode);
  } else {
    api.MediaElementAudioSourceNode = MediaElementAudioSourceNodeFactory.create(api, api.AudioNode);
    api.MediaStreamTrackAudioSourceNode = MediaStreamTrackAudioSourceNodeFactory.create(api, api.AudioNode);
    api.MediaStreamAudioSourceNode = MediaStreamAudioSourceNodeFactory.create(api, api.AudioNode);
  }

  return api;
}

module.exports = { apply };
