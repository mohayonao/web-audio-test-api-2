"use strict";

require("run-with-mocha");

const assert = require("assert");
const integer = require("../../src/types/integer");

describe("types/integer", () => {
  it("Symbol.hasInstance", () => {
    assert(integer[Symbol.hasInstance](0) === true);
    assert(integer[Symbol.hasInstance](-1) === true);
    assert(integer[Symbol.hasInstance](+2) === true);
    assert(integer[Symbol.hasInstance](Math.PI) === false);
    assert(integer[Symbol.hasInstance](Infinity) === false);
    assert(integer[Symbol.hasInstance](null) === false);
  });
});
