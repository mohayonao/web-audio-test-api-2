"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioScheduledSourceNodeFactory = require("../../src/factories/AudioScheduledSourceNodeFactory");

describe("AudioScheduledSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioScheduledSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioScheduledSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
