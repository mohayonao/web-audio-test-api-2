"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioParamFactory = require("../../src/factories/AudioParamFactory");

describe("AudioParamFactory", () => {
  it("should defined all properties", () => {
    const AudioParam = AudioParamFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioParam");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioParam.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
