"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const StereoPannerNodeFactory = require("../../src/factories/StereoPannerNodeFactory");

describe("StereoPannerNodeFactory", () => {
  it("should defined all properties", () => {
    const StereoPannerNode = StereoPannerNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("StereoPannerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(StereoPannerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createStereoPanner()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createStereoPanner();

        assert(node instanceof api.StereoPannerNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.StereoPannerNode(context, {});

        assert(node instanceof api.StereoPannerNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.StereoPannerNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.StereoPannerNode(context, {});

        assert(node.pan instanceof api.AudioParam);
        assert(node.pan.value === 0);
      });
    });

    describe("pan", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.StereoPannerNode(context, {
          pan: 1
        });

        assert(node.pan.value === 1);
      });
    });
  });
});
