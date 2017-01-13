"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioSourceNodeFactory = require("../../src/factories/AudioSourceNodeFactory");

describe("AudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioSourceNode = AudioSourceNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
