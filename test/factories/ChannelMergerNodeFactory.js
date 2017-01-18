"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const ChannelMergerNodeFactory = require("../../src/factories/ChannelMergerNodeFactory");

describe("ChannelMergerNodeFactory", () => {
  it("should defined all properties", () => {
    const ChannelMergerNode = ChannelMergerNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("ChannelMergerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ChannelMergerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createChannelMerger()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createChannelMerger();

        assert(node instanceof api.ChannelMergerNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ChannelMergerNode(context, {});

        assert(node instanceof api.ChannelMergerNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ChannelMergerNode(context, {});
        }, TypeError);
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ChannelMergerNode(context, {
            numberOfInputs: 100
          });
        }, TypeError);
      });
    });
  });
});
