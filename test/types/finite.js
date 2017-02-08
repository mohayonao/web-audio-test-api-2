"use strict";

require("run-with-mocha");

const assert = require("assert");
const positive = require("../../src/types/finite");

describe("types/finite", () => {
  it("Symbol.hasInstance", () => {
    assert(positive[Symbol.hasInstance](0) === true);
    assert(positive[Symbol.hasInstance](-1) === true);
    assert(positive[Symbol.hasInstance](+2) === true);
    assert(positive[Symbol.hasInstance](Math.PI) === true);
    assert(positive[Symbol.hasInstance](Infinity) === false);
    assert(positive[Symbol.hasInstance](null) === false);
  });
});
