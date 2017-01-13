"use strict";

require("run-with-mocha");

const assert = require("assert");
const OfflineAudioContextFactory = require("../../src/factories/OfflineAudioContextFactory");

describe("OfflineAudioContextFactory", () => {
  it("should defined all properties", () => {
    const OfflineAudioContext = OfflineAudioContextFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("OfflineAudioContext");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(OfflineAudioContext.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
