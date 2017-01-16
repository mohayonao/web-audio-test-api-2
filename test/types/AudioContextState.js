"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioContextState = require("../../src/types/AudioContextState");

describe("types/AudioContextState", () => {
  it("Symbol.hasInstance", () => {
    [
      AudioContextState.SUSPENDED, "suspended",
      AudioContextState.RUNNING, "running",
      AudioContextState.CLOSED, "closed",
    ].forEach((value) => {
      assert(AudioContextState[Symbol.hasInstance](value));
    });
  });

  it("Symbol.toStringTag", () => {
    const tag = AudioContextState[Symbol.toStringTag]();

    assert(tag.includes("AudioContextState"));
  });
});
