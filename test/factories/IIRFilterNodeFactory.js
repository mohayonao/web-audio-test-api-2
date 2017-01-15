"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const IIRFilterNodeFactory = require("../../src/factories/IIRFilterNodeFactory");

describe("IIRFilterNodeFactory", () => {
  it("should defined all properties", () => {
    const IIRFilterNode = IIRFilterNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("IIRFilterNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(IIRFilterNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createIIRFilter()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createIIRFilter([ 1, 0 ], [ 1, 0 ]);

        assert(node instanceof api.IIRFilterNode);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.IIRFilterNode(context, {
          feedforward: [ 1, 0 ], feedback: [ 1, 0 ]
        });

        assert(node instanceof api.IIRFilterNode);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.IIRFilterNode(context, {
            feedforward: [ 1, 0 ], feedback: [ 1, 0 ]
          });
        }, TypeError);
      });
    });

    describe("getFrequencyResponse", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.IIRFilterNode(context, {
          feedforward: [ 1, 0 ], feedback: [ 1, 0 ]
        });
        const frequencyHz = new Float32Array([ 440, 880, 1760, 3520 ]);
        const magResponse = new Float32Array(4);
        const phaseResponse = new Float32Array(4);

        node.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
      });
    });
  });
});
