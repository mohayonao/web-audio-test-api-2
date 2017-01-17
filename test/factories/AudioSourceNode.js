"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioSourceNodeFactory = require("../../src/factories/AudioSourceNodeFactory");

describe("AudioSourceNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioSourceNode = AudioSourceNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioSourceNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioSourceNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioSourceNode(context, {});

        assert(node instanceof api.AudioSourceNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioSourceNode(context, {});
        }, TypeError);
      });
    });
  });
});
