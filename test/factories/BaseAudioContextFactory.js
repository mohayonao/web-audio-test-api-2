"use strict";

require("run-with-mocha");

const assert = require("assert");
const BaseAudioContextFactory = require("../../src/factories/BaseAudioContextFactory");

describe("BaseAudioContextFactory", () => {
  it("should defined all properties", () => {
    const BaseAudioContext = BaseAudioContextFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("BaseAudioContext");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(BaseAudioContext.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
