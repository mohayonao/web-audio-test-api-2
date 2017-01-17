"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const ChannelSplitterNodeFactory = require("../../src/factories/ChannelSplitterNodeFactory");

describe("ChannelSplitterNodeFactory", () => {
  it("should defined all properties", () => {
    const ChannelSplitterNode = ChannelSplitterNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("ChannelSplitterNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ChannelSplitterNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createChannelSplitter()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createChannelSplitter();

        assert(node instanceof api.ChannelSplitterNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ChannelSplitterNode(context, {});

        assert(node instanceof api.ChannelSplitterNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ChannelSplitterNode(context, {});
        }, TypeError);
      });
    });
  });
});
