"use strict";

require("run-with-mocha");

const assert = require("assert");
const ConvolverNodeFactory = require("../../src/factories/ConvolverNodeFactory");

describe("ConvolverNodeFactory", () => {
  it("should defined all properties", () => {
    const ConvolverNode = ConvolverNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("ConvolverNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ConvolverNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
