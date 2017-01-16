"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const ConstantSourceNodeFactory = require("../../src/factories/ConstantSourceNodeFactory");

describe("ConstantSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const ConstantSourceNode = ConstantSourceNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("ConstantSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ConstantSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createConstantSource()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createConstantSource();

        assert(node instanceof api.ConstantSourceNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ConstantSourceNode(context, {});

        assert(node instanceof api.ConstantSourceNode);
        assert(node instanceof api.AudioScheduledSourceNode);
      });

      it("new instance extends AudioSourceNode", () => {
        const api = testTools.createAPI({ disabled: "/AudioScheduledSourceNode" });
        const context = new api.AudioContext();
        const node = new api.ConstantSourceNode(context, {});

        assert(node instanceof api.ConstantSourceNode);
        assert(!(node instanceof api.AudioScheduledSourceNode));
        assert(node instanceof api.AudioSourceNode);
      });

      it("new instance extends AudioNode", () => {
        const api = testTools.createAPI({ disabled: /^Audio(Scheduled)?SourceNode/ });
        const context = new api.AudioContext();
        const node = new api.ConstantSourceNode(context, {});

        assert(node instanceof api.ConstantSourceNode);
        assert(!(node instanceof api.AudioSourceNode));
        assert(node instanceof api.AudioNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ConstantSourceNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ConstantSourceNode(context, {});

        assert(node.offset instanceof api.AudioParam);
        assert(node.offset.value === 1);
      });
    });
  });
});
