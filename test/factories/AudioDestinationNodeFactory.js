"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioDestinationNodeFactory = require("../../src/factories/AudioDestinationNodeFactory");

describe("AudioDestinationNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioDestinationNode = AudioDestinationNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioDestinationNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioDestinationNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
