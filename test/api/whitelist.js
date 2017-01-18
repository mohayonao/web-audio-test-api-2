"use strict";

require("run-with-mocha");

const assert = require("assert");
const whitelist = require("../../src/api/whitelist");

const FooFactory = {
  create(api, BaseObject) {
    return class Foo extends BaseObject {
      foo() {
        void(this);
      }

      bar() {
        void(this);
      }

      get qux() {
        return 0;
      }

      static get FOO() {
        return "FOO";
      }

      get FOO() {
        return "FOO";
      }
    };
  }
};

const BazFactory = {
  create(api, BaseObject) {
    return class Baz extends BaseObject {
      baz() {
        void(this);
      }

      get quux() {
        return 0;
      }

      static get BAZ() {
        return "BAZ";
      }

      get BAZ() {
        return "BAZ";
      }
    };
  }
};

describe("api/whitelist", () => {
  describe("apply(api, [ spec ])", () => {
    it("works", () => {
      const Foo = FooFactory.create({}, class {});
      const Baz = BazFactory.create({}, Foo);
      const api = { Foo, Baz };
      const spec = {
        "/Foo/foo": {},
        "/Foo/FOO": {},
        "/Baz/bar": {},
        "/Baz/baz": {},
        "/Baz/quux": {},
        "/Corge": {},
      };

      whitelist.apply(api, [ spec ]);

      const foo = new Foo();
      const baz = new Baz();

      assert(typeof foo.foo === "function");
      assert(typeof foo.bar === "undefined");
      assert(typeof foo.qux === "undefined");
      assert(typeof foo.FOO === "string");
      assert(typeof Foo.FOO === "string");
      assert(typeof baz.foo === "function");
      assert(typeof baz.baz === "function");
      assert(typeof baz.quux === "number");
      assert(typeof baz.BAZ === "undefined");
      assert(typeof Baz.BAZ === "undefined");
    });
  });
});
