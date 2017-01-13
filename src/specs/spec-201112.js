"use strict";

const fullName = "spec:201310";

const apiSpec = {
  "/AudioContext": { "global": "AudioContext" },
  "/AudioContext/createAnalyser": {},
  "/AudioContext/createBiquadFilter": {},
  "/AudioContext/createBuffer": { "mixToMono": true },
  "/AudioContext/createBufferSource": {},
  "/AudioContext/createChannelMerger": {},
  "/AudioContext/createChannelSplitter": {},
  "/AudioContext/createConvolver": {},
  "/AudioContext/createDelayNode": {},
  "/AudioContext/createDynamicsCompressor": {},
  "/AudioContext/createGainNode": {},
  "/AudioContext/createJavaScriptNode": {},
  "/AudioContext/createPanner": {},
  "/AudioContext/currentTime": {},
  "/AudioContext/decodeAudioData": { "void": true },
  "/AudioContext/destination": {},
  "/AudioContext/listener": {},
  "/AudioContext/sampleRate": {},

  "/AudioNode": { "global": "AudioNode" },
  "/AudioNode/connect": { "void": true },
  "/AudioNode/context": {},
  "/AudioNode/disconnect": {},
  "/AudioNode/numberOfInputs": {},
  "/AudioNode/numberOfOutputs": {},

  "/AudioSourceNode": { "global": "AudioSourceNode" },

  "/AudioDestinationNode": { "global": "AudioDestinationNode" },
  "/AudioDestinationNode/numberOfChannels": {},

  "/AudioParam": { "global": "AudioParam" },
  "/AudioParam/cancelScheduledValues": { "void": true },
  "/AudioParam/defaultValue": {},
  "/AudioParam/exponentialRampToValueAtTime": { "void": true },
  "/AudioParam/linearRampToValueAtTime": { "void": true },
  "/AudioParam/maxValue": {},
  "/AudioParam/minValue": {},
  "/AudioParam/name": {},
  "/AudioParam/setTargetValueAtTime": { "void": true },
  "/AudioParam/setValueAtTime": { "void": true },
  "/AudioParam/setValueCurveAtTime": { "void": true },
  "/AudioParam/units": {},
  "/AudioParam/value": {},

  "/GainNode": { "global": "AudioGainNode" },
  "/GainNode/gain": {},

  "/DelayNode": { "global": "DelayNode" },
  "/DelayNode/delayTime": {},

  "/AudioBuffer": { "global": "AudioBuffer" },
  "/AudioBuffer/duration": {},
  "/AudioBuffer/gain": {},
  "/AudioBuffer/getChannelData": {},
  "/AudioBuffer/length": {},
  "/AudioBuffer/numberOfChannels": {},
  "/AudioBuffer/sampleRate": {},

  "/AudioBufferSourceNode": { "global": "AudioBufferSourceNode" },
  "/AudioBufferSourceNode/buffer": {},
  "/AudioBufferSourceNode/gain": {},
  "/AudioBufferSourceNode/loop": {},
  "/AudioBufferSourceNode/noteGrainOn": {},
  "/AudioBufferSourceNode/noteOff": {},
  "/AudioBufferSourceNode/noteOn": {},
  "/AudioBufferSourceNode/playbackRate": {},

  "/MediaElementAudioSourceNode": { "global": "MediaElementAudioSourceNode" },

  "/ScriptProcessorNode": { "global": "JavaScriptAudioNode" },
  "/ScriptProcessorNode/bufferSize": {},
  "/ScriptProcessorNode/onaudioprocess": {},

  "/PannerNode": { "global": "AudioPannerNode" },
  "/PannerNode/EQUALPOWER": {},
  "/PannerNode/HRTF": {},
  "/PannerNode/SOUNDFIELD": {},
  "/PannerNode/coneGain": {},
  "/PannerNode/coneInnerAngle": {},
  "/PannerNode/coneOuterAngle": {},
  "/PannerNode/coneOuterGain": {},
  "/PannerNode/distanceGain": {},
  "/PannerNode/distanceModel": {},
  "/PannerNode/maxDistance": {},
  "/PannerNode/panningModel": {},
  "/PannerNode/refDistance": {},
  "/PannerNode/rolloffFactor": {},
  "/PannerNode/setOrientation": {},
  "/PannerNode/setPosition": {},
  "/PannerNode/setVelocity": {},

  "/AudioListener": { "global": "AudioListener" },
  "/AudioListener/dopplerFactor": {},
  "/AudioListener/gain": {},
  "/AudioListener/setOrientation": {},
  "/AudioListener/setPosition": {},
  "/AudioListener/setVelocity": {},
  "/AudioListener/speedOfSound": {},

  "/ConvolverNode": { "global": "ConvolverNode" },
  "/ConvolverNode/buffer": {},

  "/AnalyserNode": { "global": "RealtimeAnalyserNode" },
  "/AnalyserNode/fftSize": {},
  "/AnalyserNode/frequencyBinCount": {},
  "/AnalyserNode/getByteFrequencyData": {},
  "/AnalyserNode/getByteTimeDomainData": {},
  "/AnalyserNode/getFloatFrequencyData": {},
  "/AnalyserNode/maxDecibels": {},
  "/AnalyserNode/minDecibels": {},
  "/AnalyserNode/smoothingTimeConstant": {},

  "/ChannelSplitterNode": { "global": "AudioChannelSplitter" },

  "/ChannelMergerNode": { "global": "AudioChannelMerger" },

  "/DynamicsCompressorNode": { "global": "DynamicsCompressorNode" },

  "/BiquadFilterNode": { "global": "BiquadFilterNode" },
  "/BiquadFilterNode/ALLPASS": {},
  "/BiquadFilterNode/BANDPASS": {},
  "/BiquadFilterNode/HIGHPASS": {},
  "/BiquadFilterNode/HIGHSHELF": {},
  "/BiquadFilterNode/LOWPASS": {},
  "/BiquadFilterNode/LOWSHELF": {},
  "/BiquadFilterNode/NOTCH": {},
  "/BiquadFilterNode/PEAKING": {},
  "/BiquadFilterNode/frequency": {},
  "/BiquadFilterNode/gain": {},
  "/BiquadFilterNode/Q": {},
  "/BiquadFilterNode/type": {},

  "/WaveShaperNode": { "global": "WaveShaperNode" },
  "/WaveShaperNode/curve": {}
};

module.exports = { fullName, apiSpec };
