"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioNodeFactory = require("../../src/factories/AudioNodeFactory");

describe("AudioNodeFactory", () => {
  it("should defined all properties", () => {
    const AudioNode = AudioNodeFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {});

        assert(node instanceof api.AudioNode);
      });

      it("new insance with closed context", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        context.close();

        assert.throws(() => {
          return new api.AudioNode(context, {});
        }, TypeError);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioNode(context, {});
        }, TypeError);
      });
    });

    describe("context", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {});

        assert(node.context === context);
      });
    });

    describe("numberOfInputs", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          inputs: [ 1 ], outputs: [ 1 ]
        });

        assert(node.numberOfInputs === 1);
      });
    });

    describe("numberOfOutputs", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          inputs: [ 1 ], outputs: [ 1 ]
        });

        assert(node.numberOfOutputs === 1);
      });
    });

    describe("channelCount", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          channelCount: 2
        });

        assert(node.channelCount === 2);

        node.channelCount = 1;
        assert(node.channelCount === 1);
      });

      it("works with AudioNodeOptions", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {
          channelCount: 1
        }, {
          channelCount: 2
        });

        assert(node.channelCount === 1);

        node.channelCount = 2;
        assert(node.channelCount === 2);
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          channelCount: 2, allowedMaxChannelCount: 4
        });

        assert.throws(() => {
          node.channelCount = 8;
        }, TypeError);
      });
    });

    describe("channelCountMode", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          channelCountMode: "clamped-max"
        });

        assert(node.channelCountMode === "clamped-max");

        node.channelCountMode = "explicit";
        assert(node.channelCountMode === "explicit");
      });

      it("works with AudioNodeOptions", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {
          channelCountMode: "explicit"
        }, {
          channelCountMode: "clamped-max"
        });

        assert(node.channelCountMode === "explicit");

        node.channelCountMode = "clamped-max";
        assert(node.channelCountMode === "clamped-max");
      });

      it("throws", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          channelCountMode: "clamped-max", allowedChannelCountMode: [ "clamped-max", "explicit" ]
        });

        assert.throws(() => {
          node.channelCountMode = "max";
        }, TypeError);
      });
    });

    describe("channelInterpretation", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          channelInterpretation: "discrete"
        });

        assert(node.channelInterpretation === "discrete");

        node.channelInterpretation = "speakers";
        assert(node.channelInterpretation === "speakers");
      });

      it("works with AudioNodeOptions", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {
          channelInterpretation: "speakers"
        }, {
          channelInterpretation: "discretex"
        });

        assert(node.channelInterpretation === "speakers");

        node.channelInterpretation = "discrete";
        assert(node.channelInterpretation === "discrete");
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioNode(context, {}, {
          channelInterpretation: "discrete", allowedChannelInterpretation: [ "discrete" ]
        });

        assert.throws(() => {
          node.channelInterpretation = "speakers";
        }, TypeError);
      });
    });

    describe("connect", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioNode/connect/chain": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1 ] });
        const result = node1.connect(node2);

        assert(result === node2);
      });

      it("works with AudioParam", () => {
        const api = testTools.createAPI({ "/AudioNode/connect/chain": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1 ] });
        const param = new api.AudioParam(context);
        const result = node1.connect(param);

        assert(typeof result === "undefined");
      });

      it("/AudioNode/connect/chain: false", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1 ] });
        const result = node1.connect(node2);

        assert(typeof result === "undefined");
      });

      it("throws error when different context", () => {
        const api = testTools.createAPI();
        const node1 = new api.AudioNode(new api.AudioContext(), {}, { outputs: [ 1 ] });
        const node2 = new api.AudioNode(new api.AudioContext(), {}, { inputs: [ 1 ] });

        assert.throws(() => {
          node1.connect(node2);
        }, TypeError);
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        assert.throws(() => {
          node1.connect(node2, 2, 0);
        }, TypeError);
        assert.throws(() => {
          node1.connect(node2, 0, 2);
        }, TypeError);
      });
    });

    describe("disconnect", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        node1.disconnect();
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        assert.throws(() => {
          node1.disconnect(node2);
        }, TypeError);
      });
    });

    describe("disconnect$All", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        node1.disconnect();
      });
    });

    describe("disconnect$AllFromOutput", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        node1.disconnect(0);
      });

      it("throws error", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        assert.throws(() => {
          node1.disconnect(2);
        }, TypeError);
      });
    });

    describe("disconnect$IfConnected", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        node1.disconnect(node2);
      });

      it("works with AudioParam", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const param = new api.AudioParam(context);

        node1.connect(param);
        node1.disconnect(param);
      });

      it("throws error when not connected", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        assert.throws(() => {
          node1.disconnect(node2);
        }, TypeError);
      });
    });

    describe("disconnect$FromOutputIfConnected", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);
        node1.disconnect(node2, 0, 0);
      });

      it("works with AudioParam", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const param = new api.AudioParam(context);

        node1.connect(param);
        node1.disconnect(param, 0);
      });

      it("throws error", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2);

        assert.throws(() => {
          node1.disconnect(node2, 2, 0);
        }, TypeError);
        assert.throws(() => {
          node1.disconnect(node2, 0, 2);
        }, TypeError);
      });

      it("throws error when not connected", () => {
        const api = testTools.createAPI({ "/AudioNode/disconnect/selective": true });
        const context = new api.AudioContext();
        const node1 = new api.AudioNode(context, {}, { outputs: [ 1, 1 ] });
        const node2 = new api.AudioNode(context, {}, { inputs: [ 1, 1 ] });

        node1.connect(node2, 0, 0);

        assert.throws(() => {
          node1.disconnect(node2, 0, 1);
        }, TypeError);
      });
    });
  });
});
