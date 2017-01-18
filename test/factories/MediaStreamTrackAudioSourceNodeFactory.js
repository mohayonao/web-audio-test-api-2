"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const MediaStreamTrackAudioSourceNodeFactory = require("../../src/factories/MediaStreamTrackAudioSourceNodeFactory");

describe("MediaStreamTrackAudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaStreamTrackAudioSourceNode = MediaStreamTrackAudioSourceNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("MediaStreamTrackAudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaStreamTrackAudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createMediaStreamTrackSource()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const mediaStreamTrack = new api.AudioMediaStreamTrack();
        const node = context.createMediaStreamTrackSource(mediaStreamTrack);

        assert(node instanceof api.MediaStreamTrackAudioSourceNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.MediaStreamTrackAudioSourceNode(context, {
          mediaStreamTrack: new api.AudioMediaStreamTrack()
        });

        assert(node instanceof api.MediaStreamTrackAudioSourceNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.MediaStreamTrackAudioSourceNode(context, {
            mediaStreamTrack: new api.AudioMediaStreamTrack()
          });
        }, TypeError);
      });
    });
  });
});
