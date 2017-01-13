"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioBufferFactory = require("../../src/factories/AudioBufferFactory");

describe("AudioBufferFactory", () => {
  it("should defined all properties", () => {
    const AudioBuffer = AudioBufferFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioBuffer");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioBuffer.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
