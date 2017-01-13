"use strict";

require("run-with-mocha");

const assert = require("assert");
const PannerNodeFactory = require("../../src/factories/PannerNodeFactory");

describe("PannerNodeFactory", () => {
  it("should defined all properties", () => {
    const PannerNode = PannerNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("PannerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(PannerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
