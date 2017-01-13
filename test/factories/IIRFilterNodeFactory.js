"use strict";

require("run-with-mocha");

const assert = require("assert");
const IIRFilterNodeFactory = require("../../src/factories/IIRFilterNodeFactory");

describe("IIRFilterNodeFactory", () => {
  it("should defined all properties", () => {
    const IIRFilterNode = IIRFilterNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("IIRFilterNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(IIRFilterNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
