"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioScheduledSourceNodeFactory = require("../../src/factories/AudioScheduledSourceNodeFactory");
const OscillatorNodeFactory = require("../../src/factories/OscillatorNodeFactory");
const mixin = require("../../src/utils/mixin");

describe("OscillatorNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create({}, class {});
    const OscillatorNode = mixin(OscillatorNodeFactory.create({}, class {}), AudioScheduledSourceNode);
    const properties = require("./_test-tools").getPropertyNamesToNeed("OscillatorNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(OscillatorNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
