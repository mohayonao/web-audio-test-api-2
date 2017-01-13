"use strict";

const fullName = "firefox:50";

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
  "/AudioContext/createMediaStreamDestination": {},
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

  "/AudioNode": { "global": "AudioNode" },
  "/AudioNode/channelCount": {},
  "/AudioNode/channelCountMode": {},
  "/AudioNode/channelInterpretation": {},
  "/AudioNode/connect": {},
  "/AudioNode/context": {},
  "/AudioNode/disconnect": {},
  "/AudioNode/numberOfInputs": {},
  "/AudioNode/numberOfOutputs": {},

  "/AudioDestinationNode": { "global": "AudioDestinationNode" },
  "/AudioDestinationNode/maxChannelCount": {},

  "/AudioParam": { "global": "AudioParam" },
  "/AudioParam/cancelScheduledValues": {},
  "/AudioParam/defaultValue": {},
  "/AudioParam/exponentialRampToValueAtTime": {},
  "/AudioParam/linearRampToValueAtTime": {},
  "/AudioParam/setTargetAtTime": {},
  "/AudioParam/setValueAtTime": {},
  "/AudioParam/setValueCurveAtTime": {},
  "/AudioParam/value": {},

  "/GainNode": { "global": "GainNode" },
  "/GainNode/gain": {},

  "/DelayNode": { "global": "DelayNode" },
  "/DelayNode/delayTime": {},

  "/AudioBuffer": { "global": "AudioBuffer" },
  "/AudioBuffer/copyFromChannel": {},
  "/AudioBuffer/copyToChannel": {},
  "/AudioBuffer/duration": {},
  "/AudioBuffer/getChannelData": {},
  "/AudioBuffer/length": {},
  "/AudioBuffer/numberOfChannels": {},
  "/AudioBuffer/sampleRate": {},

  "/AudioBufferSourceNode": { "global": "AudioBufferSourceNode" },
  "/AudioBufferSourceNode/buffer": {},
  "/AudioBufferSourceNode/detune": {},
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
  "/PannerNode/orientationX": {},
  "/PannerNode/orientationY": {},
  "/PannerNode/orientationZ": {},
  "/PannerNode/panningModel": {},
  "/PannerNode/positionX": {},
  "/PannerNode/positionY": {},
  "/PannerNode/positionZ": {},
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

  "/StereoPannerNode": { "global": "StereoPannerNode" },
  "/StereoPannerNode/pan": {},

  "/ConvolverNode": { "global": "ConvolverNode" },
  "/ConvolverNode/buffer": {},
  "/ConvolverNode/normalize": {},

  "/AnalyserNode": { "global": "AnalyserNode" },
  "/AnalyserNode/fftSize": {},
  "/AnalyserNode/frequencyBinCount": {},
  "/AnalyserNode/getByteFrequencyData": {},
  "/AnalyserNode/getByteTimeDomainData": {},
  "/AnalyserNode/getFloatFrequencyData": {},
  "/AnalyserNode/getFloatTimeDomainData": {},
  "/AnalyserNode/maxDecibels": {},
  "/AnalyserNode/minDecibels": {},
  "/AnalyserNode/smoothingTimeConstant": {},

  "/ChannelSplitterNode": { "global": "ChannelSplitterNode" },

  "/ChannelMergerNode": { "global": "ChannelMergerNode" },

  "/DynamicsCompressorNode": { "global": "DynamicsCompressorNode" },
  "/DynamicsCompressorNode/attack": {},
  "/DynamicsCompressorNode/knee": {},
  "/DynamicsCompressorNode/ratio": {},
  "/DynamicsCompressorNode/reduction": {},
  "/DynamicsCompressorNode/release": {},
  "/DynamicsCompressorNode/threshold": {},

  "/BiquadFilterNode": { "global": "BiquadFilterNode" },
  "/BiquadFilterNode/detune": {},
  "/BiquadFilterNode/frequency": {},
  "/BiquadFilterNode/gain": {},
  "/BiquadFilterNode/getFrequencyResponse": {},
  "/BiquadFilterNode/Q": {},
  "/BiquadFilterNode/type": {},

  "/IIRFilterNode": { "global": "IIRFilterNode" },
  "/IIRFilterNode/getFrequencyResponse": {},

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
