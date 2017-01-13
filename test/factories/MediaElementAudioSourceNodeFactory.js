"use strict";

require("run-with-mocha");

const assert = require("assert");
const MediaElementAudioSourceNodeFactory = require("../../src/factories/MediaElementAudioSourceNodeFactory");

describe("MediaElementAudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaElementAudioSourceNode = MediaElementAudioSourceNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("MediaElementAudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaElementAudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
