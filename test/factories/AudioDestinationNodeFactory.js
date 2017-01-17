"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioDestinationNodeFactory = require("../../src/factories/AudioDestinationNodeFactory");

describe("AudioDestinationNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioDestinationNode = AudioDestinationNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioDestinationNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioDestinationNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.destination", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.destination;

        assert(node instanceof api.AudioDestinationNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioDestinationNode(context, {
          numberOfChannels: 2
        });

        assert(node instanceof api.AudioDestinationNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioDestinationNode(context, {
            numberOfChannels: 2
          });
        }, TypeError);
      });

      it("default properties", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.destination;

        assert(node.maxChannelCount === 2);
      });
    });

    describe("ancient properties", () => {
      describe("numberOfChannels", () => {
        it("works", () => {
          const api = testTools.createAPI();
          const context = new api.AudioContext();
          const node = context.destination;

          assert(node.numberOfChannels === 2);
        });
      });
    });
  });
});
