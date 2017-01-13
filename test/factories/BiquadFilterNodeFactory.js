"use strict";

require("run-with-mocha");

const assert = require("assert");
const BiquadFilterNodeFactory = require("../../src/factories/BiquadFilterNodeFactory");

describe("BiquadFilterNodeFactory", () => {
  it("should defined all properties", () => {
    const BiquadFilterNode = BiquadFilterNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("BiquadFilterNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(BiquadFilterNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
