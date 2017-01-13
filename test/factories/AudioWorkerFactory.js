"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioWorkerFactory = require("../../src/factories/AudioWorkerFactory");

describe("AudioWorkerFactory", () => {
  it("should defined all properties", () => {
    const AudioWorker = AudioWorkerFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioWorker");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioWorker.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
