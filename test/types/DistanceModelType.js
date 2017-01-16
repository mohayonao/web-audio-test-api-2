"use strict";

require("run-with-mocha");

const assert = require("assert");
const DistanceModelType = require("../../src/types/DistanceModelType");

describe("types/DistanceModelType", () => {
  it("Symbol.hasInstance", () => {
    [
      DistanceModelType.LINEAR, "linear",
      DistanceModelType.INVERSE, "inverse",
      DistanceModelType.EXPONENTIAL, "exponential",
    ].forEach((value) => {
      assert(DistanceModelType[Symbol.hasInstance](value));
    });
  });

  it("Symbol.toStringTag", () => {
    const tag = DistanceModelType[Symbol.toStringTag]();

    assert(tag.includes("DistanceModelType"));
  });
});
