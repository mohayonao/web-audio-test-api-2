"use strict";

const WebAudioTestAPI = require("../lib");
const assert = require("assert");
const test = require("eatest");

[
  "chrome", "firefox", "safari", "edge"
].forEach((name) => {
  test.fork(name, () => {
    const api = WebAudioTestAPI.createAPI(name).install();

    program(api, name);
  });
});

function program() {
  const AudioContext = global.AudioContext || global.webkitAudioContext;
  const audioContext = new AudioContext();

  assert.doesNotThrow(() => {
    coin(audioContext.destination, 0);
  });
}

function coin(destination, playbackTime) {
  var t0 = playbackTime;
  var t1 = t0 + tdur(180, 16);
  var t2 = t0 + tdur(180, 4) * 3;
  var si = mtof(83);
  var mi = mtof(88);
  var audioContext = destination.context;
  var oscillator = audioContext.createOscillator();
  var gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(si, t0);
  oscillator.frequency.setValueAtTime(mi, t1);
  oscillator.start(t0);
  oscillator.stop(t2);
  oscillator.connect(gain);

  gain.gain.setValueAtTime(0.5, t0);
  gain.gain.setValueAtTime(0.5, t1);
  gain.gain.linearRampToValueAtTime(0, t2);
  gain.connect(destination);
}

function mtof(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function tdur(tempo, length) {
  return (60 / tempo) * (4 / length);
}
