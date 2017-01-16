"use strict";

require("run-with-mocha");

const assert = require("assert");
const OverSampleType = require("../../src/types/OverSampleType");

describe("types/OverSampleType", () => {
  it("Symbol.hasInstance", () => {
    [
      OverSampleType.NONE, "none",
      OverSampleType.X2, "2x",
      OverSampleType.X4, "4x",
    ].forEach((value) => {
      assert(OverSampleType[Symbol.hasInstance](value));
    });
  });

  it("Symbol.toStringTag", () => {
    const tag = OverSampleType[Symbol.toStringTag]();

    assert(tag.includes("OverSampleType"));
  });
});
