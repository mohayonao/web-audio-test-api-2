"use strict";

require("run-with-mocha");

const assert = require("assert");
const defaults = require("../../src/utils/defaults");

describe("utils/defaults(...values)", () => {
  it("works", () => {
    assert(defaults(0, 1) === 0);
    assert(defaults(null, 1) === null);
    assert(defaults(undefined, 1) === 1);
    assert(defaults(undefined, 1, 2) === 1);
    assert(defaults(undefined, undefined, 2) === 2);
    assert(defaults() === null);
  });
});
