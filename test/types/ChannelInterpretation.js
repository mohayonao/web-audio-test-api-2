"use strict";

require("run-with-mocha");

const assert = require("assert");
const ChannelInterpretation = require("../../src/types/ChannelInterpretation");

describe("types/ChannelInterpretation", () => {
  it("Symbol.hasInstance", () => {
    [
      ChannelInterpretation.SPEAKERS, "speakers",
      ChannelInterpretation.DISCRETE, "discrete",
    ].forEach((value) => {
      assert(ChannelInterpretation[Symbol.hasInstance](value));
    });
  });

  it("Symbol.toStringTag", () => {
    const tag = ChannelInterpretation[Symbol.toStringTag]();

    assert(tag.includes("ChannelInterpretation"));
  });
});
