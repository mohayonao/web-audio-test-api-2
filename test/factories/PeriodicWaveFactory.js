"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const PeriodicWaveFactory = require("../../src/factories/PeriodicWaveFactory");

describe("PeriodicWaveFactory", () => {
  it("should defined all properties", () => {
    const PeriodicWave = PeriodicWaveFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("PeriodicWave");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(PeriodicWave.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createPeriodicWave()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = context.createPeriodicWave([ 0, 0 ], [ 0, 1 ]);

        assert(node instanceof api.PeriodicWave);
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.PeriodicWave(context, {
          real: [ 0, 0 ], imag: [ 0, 1 ]
        });

        assert(node instanceof api.PeriodicWave);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ illegal: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.PeriodicWave(context, {
            real: [ 0, 0 ], imag: [ 0, 1 ]
          });
        }, TypeError);
      });
    });
  });
});
