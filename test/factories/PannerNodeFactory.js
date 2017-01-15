"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const SpatialPannerNodeFactory = require("../../src/factories/SpatialPannerNodeFactory");
const PannerNodeFactory = require("../../src/factories/PannerNodeFactory");
const mixin = require("../../src/utils/mixin");

describe("PannerNodeFactory", () => {
  it("should defined all properties", () => {
    const SpatialPannerNode = SpatialPannerNodeFactory.create({}, class {});
    const PannerNode = mixin(PannerNodeFactory.create({}, class {}), SpatialPannerNode);
    const properties = testTools.getPropertyNamesToNeed("PannerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(PannerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createPanner()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createPanner();

        assert(node instanceof api.PannerNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PannerNode(context, {});

        assert(node instanceof api.PannerNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.PannerNode(context, {});
        }, TypeError);
      });
    });

    describe("setPosition", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PannerNode(context, {});

        node.setPosition(1, 2, 3);

        assert(node.positionX.value === 1);
        assert(node.positionY.value === 2);
        assert(node.positionZ.value === 3);
      });
    });

    describe("setOrientation", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PannerNode(context, {});

        node.setOrientation(1, 2, 3);

        assert(node.orientationX.value === 1);
        assert(node.orientationY.value === 2);
        assert(node.orientationZ.value === 3);
      });
    });

    describe("setVelocity", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PannerNode(context, {});

        node.setVelocity(1, 2, 3);
      });
    });
  });

  describe("ancient properties", () => {
    describe("coneGain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PannerNode(context, {});

        assert(node.coneGain instanceof api.AudioParam);
      });
    });

    describe("distanceGain", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PannerNode(context, {});

        assert(node.distanceGain instanceof api.AudioParam);
      });
    });
  });
});
