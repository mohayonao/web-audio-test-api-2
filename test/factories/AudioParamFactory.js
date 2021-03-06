"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioParamFactory = require("../../src/factories/AudioParamFactory");

describe("AudioParamFactory", () => {
  it("should defined all properties", () => {
    const AudioParam = AudioParamFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioParam");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioParam.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param instanceof api.AudioParam);
      });

      it("new instance, but @protected", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioParam(context, {});
        }, TypeError);
      });
    });

    describe("value", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {
          value: 100
        });

        assert(param.value === 100);

        param.value = 50;
        assert(param.value === 50);
      });
    });

    describe("defaultValue", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {
          defaultValue: 100
        });

        assert(param.defaultValue === 100);
      });
    });

    describe("minValue", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {
          minValue: 1
        });

        assert(param.minValue === 1);
      });
    });

    describe("maxValue", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {
          maxValue: 100
        });

        assert(param.maxValue === 100);
      });
    });

    describe("setValueAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/setValueAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.setValueAtTime(0, 1) === param);
      });

      it("/AudioParam/setValueAtTime/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.setValueAtTime(0, 1) === "undefined");
      });
    });

    describe("linearRampToValueAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/linearRampToValueAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        param.setValueAtTime(1, 0);

        assert(param.linearRampToValueAtTime(0.5, 1) === param);
      });

      it("/AudioParam/linearRampToValueAtTime/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        param.setValueAtTime(1, 0);

        assert(typeof param.linearRampToValueAtTime(0.5, 1) === "undefined");
      });
    });

    describe("exponentialRampToValueAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/exponentialRampToValueAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        param.setValueAtTime(1, 0);

        assert(param.exponentialRampToValueAtTime(0.5, 1) === param);
      });

      it("/AudioParam/exponentialRampToValueAtTime/chain: false", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        param.setValueAtTime(1, 0);

        assert(typeof param.exponentialRampToValueAtTime(0.5, 1) === "undefined");
      });
    });

    describe("setTargetAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/setTargetAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.setTargetAtTime(0.5, 1, 2) === param);
      });

      it("/AudioParam/setTargetAtTime/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.setTargetAtTime(0.5, 1, 2) === "undefined");
      });
    });

    describe("setValueCurveAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/setValueCurveAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.setValueCurveAtTime(new Float32Array([ 0, 0.5 ]), 1, 2) === param);
      });

      it("/AudioParam/setValueCurveAtTime/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.setValueCurveAtTime(new Float32Array([ 0, 0.5 ]), 1, 2) === "undefined");
      });
    });

    describe("cancelScheduledValues", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/cancelScheduledValues/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.cancelScheduledValues(0) === param);
      });

      it("/AudioParam/cancelScheduledValues/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.cancelScheduledValues(0) === "undefined");
      });
    });

    describe("cancelAndHoldAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/cancelAndHoldAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.cancelAndHoldAtTime(0) === param);
      });

      it("/AudioParam/cancelAndHoldAtTime/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.cancelAndHoldAtTime(0) === "undefined");
      });
    });
  });

  describe("@deprecated", () => {
    describe("name", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {
          name: "gain"
        });

        assert(param.name === "gain");
      });
    });

    describe("units", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.units === 0);
      });
    });

    describe("computedValue", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.computedValue === "number");
      });
    });

    describe("setTargetValueAtTime", () => {
      it("works", () => {
        const api = testTools.createAPI({ "/AudioParam/setTargetValueAtTime/chain": true });
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(param.setTargetValueAtTime(0.5, 1, 2) === param);
      });

      it("/AudioParam/setTargetValueAtTime/chain: false", () => {
        const api = testTools.createAPI({});
        const context = new api.AudioContext();
        const param = new api.AudioParam(context, {});

        assert(typeof param.setTargetValueAtTime(0.5, 1, 2) === "undefined");
      });
    });
  });
});
