"use strict";

require("run-with-mocha");

const assert = require("assert");
const ConstantSourceNodeFactory = require("../../src/factories/ConstantSourceNodeFactory");

describe("ConstantSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const ConstantSourceNode = ConstantSourceNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("ConstantSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ConstantSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
