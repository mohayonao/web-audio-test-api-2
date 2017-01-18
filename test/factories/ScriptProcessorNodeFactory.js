"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const ScriptProcessorNodeFactory = require("../../src/factories/ScriptProcessorNodeFactory");

describe("ScriptProcessorNodeFactory", () => {
  it("should defined all properties", () => {
    const ScriptProcessorNode = ScriptProcessorNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("ScriptProcessorNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ScriptProcessorNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createScriptProcessor()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createScriptProcessor(1024, 1, 1);

        assert(node instanceof api.ScriptProcessorNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ScriptProcessorNode(context, {
          bufferSize: 1024, numberOfInputChannels: 1, numberOfOutputChannels: 1
        });

        assert(node instanceof api.ScriptProcessorNode);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ScriptProcessorNode(context, {
            bufferSize: 1024, numberOfInputChannels: 1, numberOfOutputChannels: 1
          });
        }, TypeError);
      });

      it("throws error", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.ScriptProcessorNode(context, {
            bufferSize: 0, numberOfInputChannels: 1, numberOfOutputChannels: 1
          });
        }, TypeError);
        assert.throws(() => {
          return new api.ScriptProcessorNode(context, {
            bufferSize: 1024, numberOfInputChannels: 100, numberOfOutputChannels: 0
          });
        }, TypeError);
        assert.throws(() => {
          return new api.ScriptProcessorNode(context, {
            bufferSize: 1024, numberOfInputChannels: 0, numberOfOutputChannels: 100
          });
        }, TypeError);
        assert.throws(() => {
          return new api.ScriptProcessorNode(context, {
            bufferSize: 1024, numberOfInputChannels: 0, numberOfOutputChannels: 0
          });
        }, TypeError);
      });
    });

    describe("bufferSize", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ScriptProcessorNode(context, {
          bufferSize: 1024, numberOfInputChannels: 1, numberOfOutputChannels: 1
        });

        assert(node.bufferSize == 1024);
      });
    });

    describe("onaudioprocess", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.ScriptProcessorNode(context, {
          bufferSize: 1024, numberOfInputChannels: 1, numberOfOutputChannels: 1
        });
        const onaudioprocess = () => {};

        assert(node.onaudioprocess === null);

        node.onaudioprocess = onaudioprocess;
        assert(node.onaudioprocess === onaudioprocess);
      });
    });
  });
});
