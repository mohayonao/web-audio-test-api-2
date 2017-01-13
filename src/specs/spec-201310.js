"use strict";

const fullName = "spec:201310";

const apiSpec = {
  "/AudioContext": { "global": "AudioContext" },
  "/AudioContext/createAnalyser": {},
  "/AudioContext/createBiquadFilter": {},
  "/AudioContext/createBuffer": {},
  "/AudioContext/createBufferSource": {},
  "/AudioContext/createChannelMerger": {},
  "/AudioContext/createChannelSplitter": {},
  "/AudioContext/createConvolver": {},
  "/AudioContext/createDelay": {},
  "/AudioContext/createDynamicsCompressor": {},
  "/AudioContext/createGain": {},
  "/AudioContext/createMediaElementSource": {},
  "/AudioContext/createMediaStreamDestination": {},
  "/AudioContext/createMediaStreamSource": {},
  "/AudioContext/createOscillator": {},
  "/AudioContext/createPanner": {},
  "/AudioContext/createPeriodicWave": {},
  "/AudioContext/createScriptProcessor": {},
  "/AudioContext/createWaveShaper": {},
  "/AudioContext/currentTime": {},
  "/AudioContext/decodeAudioData": { "void": true },
  "/AudioContext/destination": {},
  "/AudioContext/listener": {},
  "/AudioContext/sampleRate": {},

  "/OfflineAudioContext": { "global": "OfflineAudioContext" },
  "/OfflineAudioContext/oncomplete": {},
  "/OfflineAudioContext/startRendering": { "void": true },

  "/AudioNode": { "global": "AudioNode" },
  "/AudioNode/channelCount": {},
  "/AudioNode/channelCountMode": {},
  "/AudioNode/channelInterpretation": {},
  "/AudioNode/connect": { "void": true },
  "/AudioNode/context": {},
  "/AudioNode/disconnect": {},
  "/AudioNode/numberOfInputs": {},
  "/AudioNode/numberOfOutputs": {},

  "/AudioDestinationNode": { "global": "AudioDestinationNode" },
  "/AudioDestinationNode/maxChannelCount": {},

  "/AudioParam": { "global": "AudioParam" },
  "/AudioParam/cancelScheduledValues": { "void": true },
  "/AudioParam/defaultValue": {},
  "/AudioParam/exponentialRampToValueAtTime": { "void": true },
  "/AudioParam/linearRampToValueAtTime": { "void": true },
  "/AudioParam/setTargetAtTime": { "void": true },
  "/AudioParam/setValueAtTime": { "void": true },
  "/AudioParam/setValueCurveAtTime": { "void": true },
  "/AudioParam/value": {},

  "/GainNode": { "global": "GainNode" },
  "/GainNode/gain": {},

  "/DelayNode": { "global": "DelayNode" },
  "/DelayNode/delayTime": {},

  "/AudioBuffer": { "global": "AudioBuffer" },
  "/AudioBuffer/duration": {},
  "/AudioBuffer/getChannelData": {},
  "/AudioBuffer/length": {},
  "/AudioBuffer/numberOfChannels": {},
  "/AudioBuffer/sampleRate": {},

  "/AudioBufferSourceNode": { "global": "AudioBufferSourceNode" },
  "/AudioBufferSourceNode/buffer": {},
  "/AudioBufferSourceNode/loop": {},
  "/AudioBufferSourceNode/loopEnd": {},
  "/AudioBufferSourceNode/loopStart": {},
  "/AudioBufferSourceNode/onended": {},
  "/AudioBufferSourceNode/playbackRate": {},
  "/AudioBufferSourceNode/start": {},
  "/AudioBufferSourceNode/stop": {},

  "/MediaElementAudioSourceNode": { "global": "MediaElementAudioSourceNode" },

  "/ScriptProcessorNode": { "global": "ScriptProcessorNode" },
  "/ScriptProcessorNode/bufferSize": {},
  "/ScriptProcessorNode/onaudioprocess": {},

  "/PannerNode": { "global": "PannerNode" },
  "/PannerNode/coneInnerAngle": {},
  "/PannerNode/coneOuterAngle": {},
  "/PannerNode/coneOuterGain": {},
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
  "/AudioListener/setOrientation": {},
  "/AudioListener/setPosition": {},
  "/AudioListener/setVelocity": {},
  "/AudioListener/speedOfSound": {},

  "/ConvolverNode": { "global": "ConvolverNode" },
  "/ConvolverNode/buffer": {},
  "/ConvolverNode/normalize": {},

  "/AnalyserNode": { "global": "AnalyserNode" },
  "/AnalyserNode/fftSize": {},
  "/AnalyserNode/frequencyBinCount": {},
  "/AnalyserNode/getByteFrequencyData": {},
  "/AnalyserNode/getByteTimeDomainData": {},
  "/AnalyserNode/getFloatFrequencyData": {},
  "/AnalyserNode/maxDecibels": {},
  "/AnalyserNode/minDecibels": {},
  "/AnalyserNode/smoothingTimeConstant": {},

  "/ChannelSplitterNode": { "global": "ChannelSplitterNode" },

  "/ChannelMergerNode": { "global": "ChannelMergerNode" },

  "/DynamicsCompressorNode": { "global": "DynamicsCompressorNode" },
  "/DynamicsCompressorNode/attack": {},
  "/DynamicsCompressorNode/knee": {},
  "/DynamicsCompressorNode/ratio": {},
  "/DynamicsCompressorNode/reduction": { "AudioParam": true },
  "/DynamicsCompressorNode/release": {},
  "/DynamicsCompressorNode/threshold": {},

  "/BiquadFilterNode": { "global": "BiquadFilterNode" },
  "/BiquadFilterNode/detune": {},
  "/BiquadFilterNode/frequency": {},
  "/BiquadFilterNode/gain": {},
  "/BiquadFilterNode/getFrequencyResponse": {},
  "/BiquadFilterNode/Q": {},
  "/BiquadFilterNode/type": {},

  "/WaveShaperNode": { "global": "WaveShaperNode" },
  "/WaveShaperNode/curve": {},
  "/WaveShaperNode/oversample": {},

  "/OscillatorNode": { "global": "OscillatorNode" },
  "/OscillatorNode/detune": {},
  "/OscillatorNode/frequency": {},
  "/OscillatorNode/onended": {},
  "/OscillatorNode/setPeriodicWave": {},
  "/OscillatorNode/start": {},
  "/OscillatorNode/stop": {},
  "/OscillatorNode/type": {},

  "/PeriodicWave": { "global": "PeriodicWave" },

  "/MediaStreamAudioSourceNode": { "global": "MediaStreamAudioSourceNode" },

  "/MediaStreamAudioDestinationNode": { "global": "MediaStreamAudioDestinationNode" },
  "/MediaStreamAudioDestinationNode/stream": {}
};

module.exports = { fullName, apiSpec };
