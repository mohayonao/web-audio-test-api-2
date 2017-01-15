"use strict";

const name = "safari:10";

const apiSpec = {
  "/AudioContext": { "global": "webkitAudioContext" },
  "/AudioContext/activeSourceCount": {},
  "/AudioContext/close": {},
  "/AudioContext/createAnalyser": {},
  "/AudioContext/createBiquadFilter": {},
  "/AudioContext/createBuffer": {},
  "/AudioContext/createBufferSource": {},
  "/AudioContext/createChannelMerger": {},
  "/AudioContext/createChannelSplitter": {},
  "/AudioContext/createConvolver": {},
  "/AudioContext/createDelay": {},
  "/AudioContext/createDelayNode": {},
  "/AudioContext/createDynamicsCompressor": {},
  "/AudioContext/createGain": {},
  "/AudioContext/createGainNode": {},
  "/AudioContext/createJavaScriptNode": {},
  "/AudioContext/createMediaElementSource": {},
  "/AudioContext/createOscillator": {},
  "/AudioContext/createPanner": {},
  "/AudioContext/createPeriodicWave": {},
  "/AudioContext/createScriptProcessor": {},
  "/AudioContext/createWaveShaper": {},
  "/AudioContext/currentTime": {},
  "/AudioContext/decodeAudioData": { "void": true },
  "/AudioContext/destination": {},
  "/AudioContext/listener": {},
  "/AudioContext/oncomplete": {},
  "/AudioContext/onstatechange": {},
  "/AudioContext/resume": {},
  "/AudioContext/sampleRate": {},
  "/AudioContext/startRendering": { "void": true },
  "/AudioContext/state": {},
  "/AudioContext/suspend": {},

  "/OfflineAudioContext": { "global": "webkitOfflineAudioContext" },

  "/AudioNode": { "global": "AudioNode", "constructor": "illegal" },
  "/AudioNode/channelCount": {},
  "/AudioNode/channelCountMode": {},
  "/AudioNode/channelInterpretation": {},
  "/AudioNode/connect": { "void": true },
  "/AudioNode/context": {},
  "/AudioNode/disconnect": {},
  "/AudioNode/numberOfInputs": {},
  "/AudioNode/numberOfOutputs": {},

  "/AudioDestinationNode": { "global": "AudioDestinationNode", "constructor": "illegal" },
  "/AudioDestinationNode/maxChannelCount": {},

  "/AudioParam": { "global": "AudioParam", "constructor": "illegal" },
  "/AudioParam/cancelScheduledValues": { "void": true },
  "/AudioParam/defaultValue": {},
  "/AudioParam/exponentialRampToValueAtTime": { "void": true },
  "/AudioParam/linearRampToValueAtTime": { "void": true },
  "/AudioParam/maxValue": {},
  "/AudioParam/minValue": {},
  "/AudioParam/name": {},
  "/AudioParam/setTargetAtTime": { "void": true },
  "/AudioParam/setTargetValueAtTime": { "void": true },
  "/AudioParam/setValueAtTime": { "void": true },
  "/AudioParam/setValueCurveAtTime": { "void": true },
  "/AudioParam/units": {},
  "/AudioParam/value": {},

  "/GainNode": { "global": "GainNode", "constructor": "illegal" },
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
  "/AudioBufferSourceNode/FINISHED_STATE": {},
  "/AudioBufferSourceNode/PLAYING_STATE": {},
  "/AudioBufferSourceNode/SCHEDULED_STATE": {},
  "/AudioBufferSourceNode/UNSCHEDULED_STATE": {},
  "/AudioBufferSourceNode/buffer": {},
  "/AudioBufferSourceNode/gain": {},
  "/AudioBufferSourceNode/loop": {},
  "/AudioBufferSourceNode/loopEnd": {},
  "/AudioBufferSourceNode/looping": {},
  "/AudioBufferSourceNode/loopStart": {},
  "/AudioBufferSourceNode/noteGrainOn": {},
  "/AudioBufferSourceNode/noteOff": {},
  "/AudioBufferSourceNode/noteOn": {},
  "/AudioBufferSourceNode/onended": {},
  "/AudioBufferSourceNode/playbackRate": {},
  "/AudioBufferSourceNode/playbackState": {},
  "/AudioBufferSourceNode/start": {},
  "/AudioBufferSourceNode/stop": {},

  "/MediaElementAudioSourceNode": { "global": "MediaElementAudioSourceNode", "constructor": "illegal" },
  "/MediaElementAudioSourceNode/mediaElement": {},

  "/ScriptProcessorNode": { "global": "ScriptProcessorNode", "constructor": "illegal" },
  "/ScriptProcessorNode/bufferSize": {},
  "/ScriptProcessorNode/onaudioprocess": {},

  "/PannerNode": { "global": false, "constructor": "illegal" },
  "/PannerNode/EQUALPOWER": {},
  "/PannerNode/EXPONENTIAL_DISTANCE": {},
  "/PannerNode/HRTF": {},
  "/PannerNode/INVERSE_DISTANCE": {},
  "/PannerNode/LINEAR_DISTANCE": {},
  "/PannerNode/SOUNDFIELD": {},
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

  "/ConvolverNode": { "global": "ConvolverNode", "constructor": "illegal" },
  "/ConvolverNode/buffer": {},
  "/ConvolverNode/normalize": {},

  "/AnalyserNode": { "global": "AnalyserNode", "constructor": "illegal" },
  "/AnalyserNode/fftSize": {},
  "/AnalyserNode/frequencyBinCount": {},
  "/AnalyserNode/getByteFrequencyData": {},
  "/AnalyserNode/getByteTimeDomainData": {},
  "/AnalyserNode/getFloatFrequencyData": {},
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
  "/BiquadFilterNode/ALLPASS": {},
  "/BiquadFilterNode/BANDPASS": {},
  "/BiquadFilterNode/HIGHPASS": {},
  "/BiquadFilterNode/HIGHSHELF": {},
  "/BiquadFilterNode/LOWPASS": {},
  "/BiquadFilterNode/LOWSHELF": {},
  "/BiquadFilterNode/NOTCH": {},
  "/BiquadFilterNode/PEAKING": {},
  "/BiquadFilterNode/detune": {},
  "/BiquadFilterNode/frequency": {},
  "/BiquadFilterNode/gain": {},
  "/BiquadFilterNode/getFrequencyResponse": {},
  "/BiquadFilterNode/Q": {},
  "/BiquadFilterNode/type": {},

  "/WaveShaperNode": { "global": "WaveShaperNode", "constructor": "illegal" },
  "/WaveShaperNode/curve": {},
  "/WaveShaperNode/oversample": {},

  "/OscillatorNode": { "global": "OscillatorNode", "constructor": "illegal" },
  "/OscillatorNode/CUSTOM": {},
  "/OscillatorNode/FINISHED_STATE": {},
  "/OscillatorNode/PLAYING_STATE": {},
  "/OscillatorNode/SAWTOOTH": {},
  "/OscillatorNode/SCHEDULED_STATE": {},
  "/OscillatorNode/SINE": {},
  "/OscillatorNode/SQUARE": {},
  "/OscillatorNode/TRIANGLE": {},
  "/OscillatorNode/UNSCHEDULED_STATE": {},
  "/OscillatorNode/detune": {},
  "/OscillatorNode/frequency": {},
  "/OscillatorNode/noteOff": {},
  "/OscillatorNode/noteOn": {},
  "/OscillatorNode/onended": {},
  "/OscillatorNode/playbackState": {},
  "/OscillatorNode/setPeriodicWave": {},
  "/OscillatorNode/start": {},
  "/OscillatorNode/stop": {},
  "/OscillatorNode/type": {},

  "/PeriodicWave": { "global": "PeriodicWave", "constructor": "illegal" }
};

module.exports = { name, apiSpec };
