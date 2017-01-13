"use strict";

require("run-with-mocha");

const assert = require("assert");
const BaseAudioContextFactory = require("../../src/factories/BaseAudioContextFactory");
const AudioContextFactory = require("../../src/factories/AudioContextFactory");
const mixin = require("../../src/utils/mixin");

describe("AudioContextFactory", () => {
  it("should defined all properties", () => {
    const BaseAudioContext = BaseAudioContextFactory.create({}, class {});
    const AudioContext = mixin(AudioContextFactory.create({}, class {}), BaseAudioContext);
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioContext");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioContext.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
