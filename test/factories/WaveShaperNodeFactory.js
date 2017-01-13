"use strict";

require("run-with-mocha");

const assert = require("assert");
const WaveShaperNodeFactory = require("../../src/factories/WaveShaperNodeFactory");

describe("WaveShaperNodeFactory", () => {
  it("should defined all properties", () => {
    const WaveShaperNode = WaveShaperNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("WaveShaperNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(WaveShaperNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
