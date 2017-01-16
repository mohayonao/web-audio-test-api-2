"use strict";

require("run-with-mocha");

const assert = require("assert");
const OscillatorType = require("../../src/types/OscillatorType");

describe("types/OscillatorType", () => {
  it("Symbol.hasInstance", () => {
    [
      OscillatorType.SINE, "sine",
      OscillatorType.SQUARE, "square",
      OscillatorType.SAWTOOTH, "sawtooth",
      OscillatorType.TRIANGLE, "triangle",
    ].forEach((value) => {
      assert(OscillatorType[Symbol.hasInstance](value));
    });
  });

  it("Symbol.toStringTag", () => {
    const tag = OscillatorType[Symbol.toStringTag]();

    assert(tag.includes("OscillatorType"));
  });
});
