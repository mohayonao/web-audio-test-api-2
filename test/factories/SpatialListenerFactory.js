"use strict";

require("run-with-mocha");

const assert = require("assert");
const SpatialListenerFactory = require("../../src/factories/SpatialListenerFactory");

describe("SpatialListenerFactory", () => {
  it("should defined all properties", () => {
    const SpatialListener = SpatialListenerFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("SpatialListener");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(SpatialListener.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
