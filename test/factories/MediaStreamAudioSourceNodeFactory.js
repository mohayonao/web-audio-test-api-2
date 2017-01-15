"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const MediaStreamAudioSourceNodeFactory = require("../../src/factories/MediaStreamAudioSourceNodeFactory");

describe("MediaStreamAudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const MediaStreamAudioSourceNode = MediaStreamAudioSourceNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("MediaStreamAudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(MediaStreamAudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createMediaStreamSource()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const mediaStream = new api.MediaStream();
        const node = context.createMediaStreamSource(mediaStream);

        assert(node instanceof api.MediaStreamAudioSourceNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.MediaStreamAudioSourceNode(context, {
          mediaStream: new api.MediaStream()
        });

        assert(node instanceof api.MediaStreamAudioSourceNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.MediaStreamAudioSourceNode(context, {
            mediaStream: new api.MediaStream()
          });
        }, TypeError);
      });
    });

    describe("mediaStream", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const mediaStream = new api.MediaStream();
        const node = context.createMediaStreamSource(mediaStream);

        assert(node.mediaStream === mediaStream);
      });
    });
  });
});
