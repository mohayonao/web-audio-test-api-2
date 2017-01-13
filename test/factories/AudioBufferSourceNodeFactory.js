"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioScheduledSourceNodeFactory = require("../../src/factories/AudioScheduledSourceNodeFactory");
const AudioBufferSourceNodeFactory = require("../../src/factories/AudioBufferSourceNodeFactory");
const mixin = require("../../src/utils/mixin");

describe("AudioBufferSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create({}, class {});
    const AudioBufferSourceNode = mixin(AudioBufferSourceNodeFactory.create({}, class {}), AudioScheduledSourceNode);
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioBufferSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioBufferSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
