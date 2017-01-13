"use strict";

require("run-with-mocha");

const assert = require("assert");
const StereoPannerNodeFactory = require("../../src/factories/StereoPannerNodeFactory");

describe("StereoPannerNodeFactory", () => {
  it("should defined all properties", () => {
    const StereoPannerNode = StereoPannerNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("StereoPannerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(StereoPannerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
