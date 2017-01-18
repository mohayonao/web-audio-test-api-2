"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const DelayNodeFactory = require("../../src/factories/DelayNodeFactory");

describe("DelayNodeFactory", () => {
  it("should defined all properties", () => {
    const DelayNode = DelayNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("DelayNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(DelayNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createDelay()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createDelay();

        assert(node instanceof api.DelayNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DelayNode(context, {});

        assert(node instanceof api.DelayNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.DelayNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DelayNode(context, {});

        assert(node.delayTime instanceof api.AudioParam);
        assert(node.delayTime.value === 0);
      });
    });

    describe("delayTime", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.DelayNode(context, {
          delayTime: 0.125
        });

        assert(node.delayTime.value === 0.125);
      });
    });
  });
});
