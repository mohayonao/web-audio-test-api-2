"use strict";

require("run-with-mocha");

const assert = require("assert");
const classprop = require("../../src/api/classprop");

const FooFactory = {
  create(api, BaseObject) {
    return class Foo extends BaseObject {
      get FOO() {
        return "FOO";
      }
    };
  }
};

describe("api/classprop", () => {
  it("apply(api, [ spec ])", () => {
    const Foo = FooFactory.create({}, class {});
    const api = { Foo };

    assert(typeof Foo.FOO === "undefined");

    classprop.apply(api);

    assert(Foo.FOO === "FOO");
  });
});
