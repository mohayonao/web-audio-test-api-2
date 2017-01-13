"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioNodeFactory = require("../../src/factories/AudioNodeFactory");

describe("AudioNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioNode = AudioNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
