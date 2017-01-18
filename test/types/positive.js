"use strict";

require("run-with-mocha");

const assert = require("assert");
const positive = require("../../src/types/positive");

describe("types/positive", () => {
  it("Symbol.hasInstance", () => {
    assert(positive[Symbol.hasInstance](0) === true);
    assert(positive[Symbol.hasInstance](-1) === false);
    assert(positive[Symbol.hasInstance](+2) === true);
    assert(positive[Symbol.hasInstance](Math.PI) === true);
    assert(positive[Symbol.hasInstance](Infinity) === true);
    assert(positive[Symbol.hasInstance](null) === false);
  });
});
