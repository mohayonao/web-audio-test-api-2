"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioListenerFactory = require("../../src/factories/AudioListenerFactory");

describe("AudioListenerFactory", () => {
  it("should defined all properties", () => {
    const AudioListener = AudioListenerFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("AudioListener");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioListener.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
