"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const SpatialPannerNodeFactory = require("../../src/factories/SpatialPannerNodeFactory");

describe("SpatialPannerNodeFactory", () => {
  it("should defined all properties", () => {
    const SpatialPannerNode = SpatialPannerNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("SpatialPannerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(SpatialPannerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createSpatialPanner()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createSpatialPanner();

        assert(node instanceof api.SpatialPannerNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.SpatialPannerNode(context, {});

        assert(node instanceof api.SpatialPannerNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.SpatialPannerNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.SpatialPannerNode(context, {});

        assert(node.panningModel === "equalpower");
        assert(node.distanceModel === "inverse");
        assert(node.refDistance === 1);
        assert(node.maxDistance === 10000);
        assert(node.rolloffFactor === 1);
        assert(node.coneInnerAngle === 360);
        assert(node.coneOuterAngle === 360);
        assert(node.coneOuterGain === 0);
        assert(node.positionX instanceof api.AudioParam);
        assert(node.positionX.value === 0);
        assert(node.positionY instanceof api.AudioParam);
        assert(node.positionY.value === 0);
        assert(node.positionZ instanceof api.AudioParam);
        assert(node.positionZ.value === 0);
        assert(node.orientationX instanceof api.AudioParam);
        assert(node.orientationX.value === 1);
        assert(node.orientationY instanceof api.AudioParam);
        assert(node.orientationY.value === 0);
        assert(node.orientationZ instanceof api.AudioParam);
        assert(node.orientationZ.value === 0);
      });
    });
  });

  describe("panningModel", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        panningModel: "HRTF"
      });

      assert(node.panningModel === "HRTF");

      node.panningModel = "equalpower";
      assert(node.panningModel === "equalpower");
    });
  });

  describe("distanceModel", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        distanceModel: "linear"
      });

      assert(node.distanceModel === "linear");

      node.distanceModel = "exponential";
      assert(node.distanceModel === "exponential");
    });
  });

  describe("refDistance", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        refDistance: 1.5
      });

      assert(node.refDistance === 1.5);

      node.refDistance = 1.75;
      assert(node.refDistance === 1.75);
    });
  });

  describe("maxDistance", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        maxDistance: 12500
      });

      assert(node.maxDistance === 12500);

      node.maxDistance = 15000;
      assert(node.maxDistance === 15000);
    });
  });

  describe("rolloffFactor", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        rolloffFactor: 0.9
      });

      assert(node.rolloffFactor === 0.9);

      node.rolloffFactor = 0.8;
      assert(node.rolloffFactor === 0.8);
    });
  });

  describe("coneInnerAngle", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        coneInnerAngle: 320
      });

      assert(node.coneInnerAngle === 320);

      node.coneInnerAngle = 270;
      assert(node.coneInnerAngle === 270);
    });
  });

  describe("coneOuterAngle", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        coneOuterAngle: 320
      });

      assert(node.coneOuterAngle === 320);

      node.coneOuterAngle = 270;
      assert(node.coneOuterAngle === 270);
    });
  });

  describe("coneOuterGain", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        coneOuterGain: 0.25
      });

      assert(node.coneOuterGain === 0.25);

      node.coneOuterGain = 0.5;
      assert(node.coneOuterGain === 0.5);
    });
  });

  describe("positionX", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        positionX: 1
      });

      assert(node.positionX.value === 1);
    });
  });

  describe("positionY", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        positionY: 1
      });

      assert(node.positionY.value === 1);
    });
  });

  describe("positionZ", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        positionZ: 1
      });

      assert(node.positionZ.value === 1);
    });
  });

  describe("orientationX", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        orientationX: 0
      });

      assert(node.orientationX.value === 0);
    });
  });

  describe("orientationY", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        orientationY: 1
      });

      assert(node.orientationY.value === 1);
    });
  });

  describe("orientationZ", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.SpatialPannerNode(context, {
        orientationZ: 1
      });

      assert(node.orientationZ.value === 1);
    });
  });
});
