"use strict";

require("run-with-mocha");

const assert = require("assert");
const MediaStreamAudioDestinationNodeFactory = require("../../src/factories/MediaStreamAudioDestinationNodeFactory");

describe("MediaStreamAudioDestinationNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("MediaStreamAudioDestinationNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaStreamAudioDestinationNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
