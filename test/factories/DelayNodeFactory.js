"use strict";

require("run-with-mocha");

const assert = require("assert");
const DelayNodeFactory = require("../../src/factories/DelayNodeFactory");

describe("DelayNodeFactory", () => {
  it("should defined all properties", () => {
    const DelayNode = DelayNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("DelayNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(DelayNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
