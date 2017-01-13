"use strict";

require("run-with-mocha");

const assert = require("assert");
const MediaStreamTrackAudioSourceNodeFactory = require("../../src/factories/MediaStreamTrackAudioSourceNodeFactory");

describe("MediaStreamTrackAudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaStreamTrackAudioSourceNode = MediaStreamTrackAudioSourceNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("MediaStreamTrackAudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaStreamTrackAudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
