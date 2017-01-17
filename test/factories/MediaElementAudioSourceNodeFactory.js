"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const MediaElementAudioSourceNodeFactory = require("../../src/factories/MediaElementAudioSourceNodeFactory");

describe("MediaElementAudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaElementAudioSourceNode = MediaElementAudioSourceNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("MediaElementAudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaElementAudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createMediaElementSource()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const mediaElement = new api.HTMLMediaElement();
        const node = context.createMediaElementSource(mediaElement);

        assert(node instanceof api.MediaElementAudioSourceNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.MediaElementAudioSourceNode(context, {
          mediaElement: new api.HTMLMediaElement()
        });

        assert(node instanceof api.MediaElementAudioSourceNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.MediaElementAudioSourceNode(context, {
            mediaElement: new api.HTMLMediaElement()
          });
        }, TypeError);
      });
    });

    describe("mediaElement", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const mediaElement = new api.HTMLMediaElement();
        const node = context.createMediaElementSource(mediaElement);

        assert(node.mediaElement === mediaElement);
      });
    });
  });
});
