"use strict";

const name = "spec:201112";

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

  "/AudioNode": { "global": "AudioNode", "constructor": "illegal" },
  "/AudioNode/connect": { "void": true },
  "/AudioNode/context": {},
  "/AudioNode/disconnect": {},
  "/AudioNode/numberOfInputs": {},
  "/AudioNode/numberOfOutputs": {},

  "/AudioSourceNode": { "global": "AudioSourceNode", "constructor": "illegal" },

  "/AudioDestinationNode": { "global": "AudioDestinationNode", "constructor": "illegal" },
  "/AudioDestinationNode/numberOfChannels": {},

  "/AudioParam": { "global": "AudioParam", "constructor": "illegal" },
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

  "/GainNode": { "global": "AudioGainNode", "constructor": "illegal" },
  "/GainNode/gain": {},

  "/DelayNode": { "global": "DelayNode", "constructor": "illegal" },
  "/DelayNode/delayTime": {},

  "/AudioBuffer": { "global": "AudioBuffer", "constructor": "illegal" },
  "/AudioBuffer/duration": {},
  "/AudioBuffer/gain": {},
  "/AudioBuffer/getChannelData": {},
  "/AudioBuffer/length": {},
  "/AudioBuffer/numberOfChannels": {},
  "/AudioBuffer/sampleRate": {},

  "/AudioBufferSourceNode": { "global": "AudioBufferSourceNode", "constructor": "illegal" },
  "/AudioBufferSourceNode/buffer": {},
  "/AudioBufferSourceNode/gain": {},
  "/AudioBufferSourceNode/loop": {},
  "/AudioBufferSourceNode/noteGrainOn": {},
  "/AudioBufferSourceNode/noteOff": {},
  "/AudioBufferSourceNode/noteOn": {},
  "/AudioBufferSourceNode/playbackRate": {},

  "/MediaElementAudioSourceNode": { "global": "MediaElementAudioSourceNode", "constructor": "illegal" },

  "/ScriptProcessorNode": { "global": "JavaScriptAudioNode", "constructor": "illegal" },
  "/ScriptProcessorNode/bufferSize": {},
  "/ScriptProcessorNode/onaudioprocess": {},

  "/PannerNode": { "global": "AudioPannerNode", "constructor": "illegal" },
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

  "/AudioListener": { "global": "AudioListener", "constructor": "illegal" },
  "/AudioListener/dopplerFactor": {},
  "/AudioListener/gain": {},
  "/AudioListener/setOrientation": {},
  "/AudioListener/setPosition": {},
  "/AudioListener/setVelocity": {},
  "/AudioListener/speedOfSound": {},

  "/ConvolverNode": { "global": "ConvolverNode", "constructor": "illegal" },
  "/ConvolverNode/buffer": {},

  "/AnalyserNode": { "global": "RealtimeAnalyserNode", "constructor": "illegal" },
  "/AnalyserNode/fftSize": {},
  "/AnalyserNode/frequencyBinCount": {},
  "/AnalyserNode/getByteFrequencyData": {},
  "/AnalyserNode/getByteTimeDomainData": {},
  "/AnalyserNode/getFloatFrequencyData": {},
  "/AnalyserNode/maxDecibels": {},
  "/AnalyserNode/minDecibels": {},
  "/AnalyserNode/smoothingTimeConstant": {},

  "/ChannelSplitterNode": { "global": "AudioChannelSplitter", "constructor": "illegal" },

  "/ChannelMergerNode": { "global": "AudioChannelMerger", "constructor": "illegal" },

  "/DynamicsCompressorNode": { "global": "DynamicsCompressorNode", "constructor": "illegal" },

  "/BiquadFilterNode": { "global": "BiquadFilterNode", "constructor": "illegal" },
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

  "/WaveShaperNode": { "global": "WaveShaperNode", "constructor": "illegal" },
  "/WaveShaperNode/curve": {}
};

module.exports = { name, apiSpec };
