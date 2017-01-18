"use strict";

require("run-with-mocha");

const assert = require("assert");
const BiquadFilterType = require("../../src/types/BiquadFilterType");

describe("types/BiquadFilterType", () => {
  it("Symbol.hasInstance", () => {
    [
      BiquadFilterType.LOWPASS, "lowpass",
      BiquadFilterType.HIGHPASS, "highpass",
      BiquadFilterType.BANDPASS, "bandpass",
      BiquadFilterType.LOWSHELF, "lowshelf",
      BiquadFilterType.HIGHSHELF, "highshelf",
      BiquadFilterType.PEAKING, "peaking",
      BiquadFilterType.NOTCH, "notch",
      BiquadFilterType.ALLPASS, "allpass",
    ].forEach((value) => {
      assert(BiquadFilterType[Symbol.hasInstance](value));
    });
  });
});
