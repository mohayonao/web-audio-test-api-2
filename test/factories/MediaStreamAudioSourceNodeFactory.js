"use strict";

require("run-with-mocha");

const assert = require("assert");
const MediaStreamAudioSourceNodeFactory = require("../../src/factories/MediaStreamAudioSourceNodeFactory");

describe("MediaStreamAudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaStreamAudioSourceNode = MediaStreamAudioSourceNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("MediaStreamAudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaStreamAudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
