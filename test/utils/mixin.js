"use strict";

require("run-with-mocha");

const assert = require("assert");
const mixin = require("../../src/utils/mixin");

describe("utils/mixin(target, source)", () => {
  it("works", () => {
    class Foo { foo() {} }
    class Bar { bar() {} }

    mixin(Foo, Bar);

    assert(!(new Foo() instanceof Bar));
    assert(Foo.prototype.hasOwnProperty("foo"));
    assert(Foo.prototype.hasOwnProperty("bar"));
  });
});
