"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioWorkerNodeFactory = require("../../src/factories/AudioWorkerNodeFactory");

describe("AudioWorkerNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioWorkerNode = AudioWorkerNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioWorkerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioWorkerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioWorkerNode(context, {});

        assert(node instanceof api.AudioWorkerNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioWorkerNode(context, {});
        }, TypeError);
      });
    });
  });
});
