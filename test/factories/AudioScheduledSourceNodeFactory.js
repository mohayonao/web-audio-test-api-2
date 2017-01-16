"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioScheduledSourceNodeFactory = require("../../src/factories/AudioScheduledSourceNodeFactory");

describe("AudioScheduledSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioScheduledSourceNode = AudioScheduledSourceNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioScheduledSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioScheduledSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioScheduledSourceNode(context, {});

        assert(node instanceof api.AudioScheduledSourceNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioScheduledSourceNode(context, {});
        }, TypeError);
      });
    });
  });

  describe("onended", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.AudioScheduledSourceNode(context, {});
      const onended = () => {};

      assert(node.onended === null);

      node.onended = onended;
      assert(node.onended === onended);
    });
  });

  describe("start", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.AudioScheduledSourceNode(context, {});

      node.start(0);
    });
  });

  describe("stop", () => {
    it("works", () => {
      const api = testTools.createAPI();
      const context = new api.AudioContext();
      const node = new api.AudioScheduledSourceNode(context, {});

      node.start(0);
      node.stop(1);
    });
  });
});
