"use strict";

require("run-with-mocha");

const assert = require("assert");
const PanningModelType = require("../../src/types/PanningModelType");

describe("types/PanningModelType", () => {
  it("Symbol.hasInstance", () => {
    [
      PanningModelType.EQUALPOWER, "equalpower",
      PanningModelType.HRTF, "HRTF",
    ].forEach((value) => {
      assert(PanningModelType[Symbol.hasInstance](value));
    });
  });
});
