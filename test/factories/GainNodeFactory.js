"use strict";

require("run-with-mocha");

const assert = require("assert");
const GainNodeFactory = require("../../src/factories/GainNodeFactory");

describe("GainNodeFactory", () => {
  it("should defined all properties", () => {
    const GainNode = GainNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("GainNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(GainNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
