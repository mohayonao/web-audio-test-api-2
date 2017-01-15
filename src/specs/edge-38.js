"use strict";

const name = "edge:38";

const apiSpec = {
  "/AudioContext": { "global": "AudioContext" },
  "/AudioContext/close": {},
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
  "/AudioContext/createIIRFilter": {},
  "/AudioContext/createMediaElementSource": {},
  "/AudioContext/createMediaStreamSource": {},
  "/AudioContext/createOscillator": {},
  "/AudioContext/createPanner": {},
  "/AudioContext/createPeriodicWave": {},
  "/AudioContext/createScriptProcessor": {},
  "/AudioContext/createStereoPanner": {},
  "/AudioContext/createWaveShaper": {},
  "/AudioContext/currentTime": {},
  "/AudioContext/decodeAudioData": {},
  "/AudioContext/destination": {},
  "/AudioContext/listener": {},
  "/AudioContext/onstatechange": {},
  "/AudioContext/resume": {},
  "/AudioContext/sampleRate": {},
  "/AudioContext/state": {},
  "/AudioContext/suspend": {},

  "/OfflineAudioContext": { "global": "OfflineAudioContext" },
  "/OfflineAudioContext/length": {},
  "/OfflineAudioContext/oncomplete": {},
  "/OfflineAudioContext/startRendering": {},
  "/OfflineAudioContext/suspend": {},

  "/AudioNode": { "global": "AudioNode", "constructor": "illegal" },
  "/AudioNode/channelCount": {},
  "/AudioNode/channelCountMode": {},
  "/AudioNode/channelInterpretation": {},
  "/AudioNode/connect": {},
  "/AudioNode/context": {},
  "/AudioNode/disconnect": {},
  "/AudioNode/numberOfInputs": {},
  "/AudioNode/numberOfOutputs": {},

  "/AudioDestinationNode": { "global": "AudioDestinationNode", "constructor": "illegal" },
  "/AudioDestinationNode/maxChannelCount": {},

  "/AudioParam": { "global": "AudioParam", "constructor": "illegal" },
  "/AudioParam/cancelScheduledValues": {},
  "/AudioParam/defaultValue": {},
  "/AudioParam/exponentialRampToValueAtTime": {},
  "/AudioParam/linearRampToValueAtTime": {},
  "/AudioParam/setTargetAtTime": {},
  "/AudioParam/setValueAtTime": {},
  "/AudioParam/setValueCurveAtTime": {},
  "/AudioParam/value": {},

  "/GainNode": { "global": "GainNode", "constructor": "illegal" },
  "/GainNode/gain": {},

  "/DelayNode": { "global": "DelayNode", "constructor": "illegal" },
  "/DelayNode/delayTime": {},

  "/AudioBuffer": { "global": "AudioBuffer", "constructor": "illegal" },
  "/AudioBuffer/copyFromChannel": {},
  "/AudioBuffer/copyToChannel": {},
  "/AudioBuffer/duration": {},
  "/AudioBuffer/getChannelData": {},
  "/AudioBuffer/length": {},
  "/AudioBuffer/numberOfChannels": {},
  "/AudioBuffer/sampleRate": {},

  "/AudioBufferSourceNode": { "global": "AudioBufferSourceNode", "constructor": "illegal" },
  "/AudioBufferSourceNode/buffer": {},
  "/AudioBufferSourceNode/detune": {},
  "/AudioBufferSourceNode/loop": {},
  "/AudioBufferSourceNode/loopEnd": {},
  "/AudioBufferSourceNode/loopStart": {},
  "/AudioBufferSourceNode/onended": {},
  "/AudioBufferSourceNode/playbackRate": {},
  "/AudioBufferSourceNode/start": {},
  "/AudioBufferSourceNode/stop": {},

  "/MediaElementAudioSourceNode": { "global": "MediaElementAudioSourceNode", "constructor": "illegal" },

  "/ScriptProcessorNode": { "global": "ScriptProcessorNode", "constructor": "illegal" },
  "/ScriptProcessorNode/bufferSize": {},
  "/ScriptProcessorNode/onaudioprocess": {},

  "/PannerNode": { "global": "PannerNode", "constructor": "illegal" },
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

  "/AudioListener": { "global": "AudioListener", "constructor": "illegal" },
  "/AudioListener/dopplerFactor": {},
  "/AudioListener/setOrientation": {},
  "/AudioListener/setPosition": {},
  "/AudioListener/setVelocity": {},
  "/AudioListener/speedOfSound": {},

  "/StereoPannerNode": { "global": "StereoPannerNode", "constructor": "illegal" },
  "/StereoPannerNode/pan": {},

  "/ConvolverNode": { "global": "ConvolverNode", "constructor": "illegal" },
  "/ConvolverNode/buffer": {},
  "/ConvolverNode/normalize": {},

  "/AnalyserNode": { "global": "AnalyserNode", "constructor": "illegal" },
  "/AnalyserNode/fftSize": {},
  "/AnalyserNode/frequencyBinCount": {},
  "/AnalyserNode/getByteFrequencyData": {},
  "/AnalyserNode/getByteTimeDomainData": {},
  "/AnalyserNode/getFloatFrequencyData": {},
  "/AnalyserNode/getFloatTimeDomainData": {},
  "/AnalyserNode/maxDecibels": {},
  "/AnalyserNode/minDecibels": {},
  "/AnalyserNode/smoothingTimeConstant": {},

  "/ChannelSplitterNode": { "global": "ChannelSplitterNode", "constructor": "illegal" },

  "/ChannelMergerNode": { "global": "ChannelMergerNode", "constructor": "illegal" },

  "/DynamicsCompressorNode": { "global": "DynamicsCompressorNode", "constructor": "illegal" },
  "/DynamicsCompressorNode/attack": {},
  "/DynamicsCompressorNode/knee": {},
  "/DynamicsCompressorNode/ratio": {},
  "/DynamicsCompressorNode/reduction": { "AudioParam": true },
  "/DynamicsCompressorNode/release": {},
  "/DynamicsCompressorNode/threshold": {},

  "/BiquadFilterNode": { "global": "BiquadFilterNode", "constructor": "illegal" },
  "/BiquadFilterNode/detune": {},
  "/BiquadFilterNode/frequency": {},
  "/BiquadFilterNode/gain": {},
  "/BiquadFilterNode/getFrequencyResponse": {},
  "/BiquadFilterNode/Q": {},
  "/BiquadFilterNode/type": {},

  "/IIRFilterNode": { "global": "IIRFilterNode", "constructor": "illegal" },
  "/IIRFilterNode/getFrequencyResponse": {},

  "/WaveShaperNode": { "global": "WaveShaperNode", "constructor": "illegal" },
  "/WaveShaperNode/curve": {},
  "/WaveShaperNode/oversample": {},

  "/OscillatorNode": { "global": "OscillatorNode", "constructor": "illegal" },
  "/OscillatorNode/detune": {},
  "/OscillatorNode/frequency": {},
  "/OscillatorNode/onended": {},
  "/OscillatorNode/setPeriodicWave": {},
  "/OscillatorNode/start": {},
  "/OscillatorNode/stop": {},
  "/OscillatorNode/type": {},

  "/PeriodicWave": { "global": "PeriodicWave", "constructor": "illegal" },

  "/MediaStreamAudioSourceNode": { "global": "MediaStreamAudioSourceNode", "constructor": "illegal" }
};

module.exports = { name, apiSpec };
