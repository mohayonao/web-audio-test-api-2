"use strict";

require("run-with-mocha");

const assert = require("assert");
const testTools = require("./_test-tools")
const AudioWorkerFactory = require("../../src/factories/AudioWorkerFactory");

describe("AudioWorkerFactory", () => {
  it("should defined all properties", () => {
    const AudioWorker = AudioWorkerFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("AudioWorker");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(AudioWorker.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("audioContext.createAudioWorker()", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();

        return context.createAudioWorker("").then((worker) => {
          assert(worker instanceof api.AudioWorker);
        });
      });

      it("new instance", () => {
        const api = testTools.createAPI();
        const context = new api.AudioContext();
        const node = new api.AudioWorker(context, {
          scriptURL: ""
        });

        assert(node instanceof api.AudioWorker);
      });

      it("new instance, but Illegal constructor", () => {
        const api = testTools.createAPI({ protected: true });
        const context = new api.AudioContext();

        assert.throws(() => {
          return new api.AudioWorker(context, {
            scriptURL: ""
          });
        }, TypeError);
      });
    });
  });
});
