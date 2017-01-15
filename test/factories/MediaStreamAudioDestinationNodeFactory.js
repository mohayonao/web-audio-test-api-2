"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const MediaStreamAudioDestinationNodeFactory = require("../../src/factories/MediaStreamAudioDestinationNodeFactory");

describe("MediaStreamAudioDestinationNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("MediaStreamAudioDestinationNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaStreamAudioDestinationNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createMediaStreamDestination()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createMediaStreamDestination();

        assert(node instanceof api.MediaStreamAudioDestinationNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.MediaStreamAudioDestinationNode(context, {});

        assert(node instanceof api.MediaStreamAudioDestinationNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.MediaStreamAudioDestinationNode(context);
        }, TypeError);
      });
    });

    describe("stream", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createMediaStreamDestination();

        assert(node.stream instanceof api.MediaStream);
      });
    });
  });
});
