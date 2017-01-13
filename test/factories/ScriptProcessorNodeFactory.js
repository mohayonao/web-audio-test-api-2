"use strict";

require("run-with-mocha");

const assert = require("assert");
const ScriptProcessorNodeFactory = require("../../src/factories/ScriptProcessorNodeFactory");

describe("ScriptProcessorNodeFactory", () => {
  it("should defined all properties", () => {
    const ScriptProcessorNode = ScriptProcessorNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("ScriptProcessorNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ScriptProcessorNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
