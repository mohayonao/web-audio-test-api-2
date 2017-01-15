"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const ConvolverNodeFactory = require("../../src/factories/ConvolverNodeFactory");

describe("ConvolverNodeFactory", () => {
  it("should defined all properties", () => {
    const ConvolverNode = ConvolverNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("ConvolverNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ConvolverNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createConvolver()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createConvolver();

        assert(node instanceof api.ConvolverNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ConvolverNode(context, {});

        assert(node instanceof api.ConvolverNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ConvolverNode(context, {});
        }, TypeError);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ConvolverNode(context, {});

        assert(node.buffer === null);
        assert(node.normalize === true);
      });
    });

    describe("buffer", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ConvolverNode(context, {});
        const buffer = new api.AudioBuffer({
          numberOfChannels: 1, length: 128, sampleRate: 44100
        });

        node.buffer = buffer;
        assert(node.buffer === buffer);
      });
    });

    describe("normalize", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ConvolverNode(context, {
          disableNormalization: true
        });

        assert(node.normalize === false);

        node.normalize = true;
        assert(node.normalize === true);
      });
    });
  });
});
