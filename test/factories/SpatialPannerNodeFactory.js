"use strict";

require("run-with-mocha");

const assert = require("assert");
const SpatialPannerNodeFactory = require("../../src/factories/SpatialPannerNodeFactory");

describe("SpatialPannerNodeFactory", () => {
  it("should defined all properties", () => {
    const SpatialPannerNode = SpatialPannerNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("SpatialPannerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(SpatialPannerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
