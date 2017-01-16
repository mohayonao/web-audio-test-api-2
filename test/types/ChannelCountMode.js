"use strict";

require("run-with-mocha");

const assert = require("assert");
const ChannelCountMode = require("../../src/types/ChannelCountMode");

describe("types/ChannelCountMode", () => {
  it("Symbol.hasInstance", () => {
    [
      ChannelCountMode.MAX, "max",
      ChannelCountMode.CLAMPED_MAX, "clamped-max",
      ChannelCountMode.EXPLICIT, "explicit",
    ].forEach((value) => {
      assert(ChannelCountMode[Symbol.hasInstance](value));
    });
  });

  it("Symbol.toStringTag", () => {
    const tag = ChannelCountMode[Symbol.toStringTag]();

    assert(tag.includes("ChannelCountMode"));
  });
});
