"use strict";

require("run-with-mocha");

const assert = require("assert");
const PeriodicWaveFactory = require("../../src/factories/PeriodicWaveFactory");

describe("PeriodicWaveFactory", () => {
  it("should defined all properties", () => {
    const PeriodicWave = PeriodicWaveFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("PeriodicWave");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(PeriodicWave.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
