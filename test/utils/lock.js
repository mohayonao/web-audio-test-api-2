"use strict";

require("run-with-mocha");

const assert = require("assert");
const lock = require("../../src/utils/lock");

describe("utils/lock", () => {
  describe("lock() / unlock() / isLocked()", () => {
    it("works", () => {
      assert(lock.isLocked() === true);

      lock.unlock();
      assert(lock.isLocked() === false);

      lock.unlock();
      assert(lock.isLocked() === false);

      lock.lock();
      assert(lock.isLocked() === false);

      lock.lock();
      assert(lock.isLocked() === true);
    });
  });

  describe("tr(fn)", () => {
    it("works", () => {
      assert(lock.isLocked() === true);
      lock.tr(() => {
        assert(lock.isLocked() === false);
      });
      assert(lock.isLocked() === true);
    });
  });
});
