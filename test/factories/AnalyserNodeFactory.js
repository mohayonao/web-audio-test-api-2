"use strict";

require("run-with-mocha");

const assert = require("assert");
const AnalyserNodeFactory = require("../../src/factories/AnalyserNodeFactory");

describe("AnalyserNodeFactory", () => {
  it("should defined all properties", () => {
    const AnalyserNode = AnalyserNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AnalyserNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AnalyserNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
