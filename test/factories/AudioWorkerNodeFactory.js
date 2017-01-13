"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioWorkerNodeFactory = require("../../src/factories/AudioWorkerNodeFactory");

describe("AudioWorkerNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioWorkerNode = AudioWorkerNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioWorkerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioWorkerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
