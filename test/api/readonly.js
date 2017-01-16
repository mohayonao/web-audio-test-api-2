"use strict";

require("run-with-mocha");

const assert = require("assert");
const readonly = require("../../src/api/readonly");

const FooFactory = {
  create(api, BaseObject) {
    return class Foo extends BaseObject {
      get immutable() {
        return 0;
      }

      get mutable() {
        return this._mutable;
      }

      set mutable(value) {
        this._mutable = value;
      }
    };
  }
};

describe("api/readonly", () => {
  it("apply(api, [ apiSpec, options ])", () => {
    const Foo = FooFactory.create({}, class {});
    const api = { Foo };

    readonly.apply(api);

    const foo = new Foo();

    assert.throws(() => {
      foo.immutable = 100;
    });
    assert(foo.immutable === 0);

    foo.mutable = 10;
    assert(foo.mutable === 10);
  });
});
