"use strict";

require("run-with-mocha");

const assert = require("assert");
const DynamicsCompressorNodeFactory = require("../../src/factories/DynamicsCompressorNodeFactory");

describe("DynamicsCompressorNodeFactory", () => {
  it("should defined all properties", () => {
    const DynamicsCompressorNode = DynamicsCompressorNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("DynamicsCompressorNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(DynamicsCompressorNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
