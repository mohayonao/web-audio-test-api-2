"use strict";

require("run-with-mocha");

const assert = require("assert");
const sinon = require("sinon");
const testTools = require("./_test-tools")
const OfflineAudioContextFactory = require("../../src/factories/OfflineAudioContextFactory");

describe("OfflineAudioContextFactory", () => {
  it("should defined all properties", () => {
    const OfflineAudioContext = OfflineAudioContextFactory.create({}, class {});
    const properties = testTools.getPropertyNamesToNeed("OfflineAudioContext");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(OfflineAudioContext.prototype, name);
    });
    assert(notDefined.length === 0);
  });

  describe("instance", () => {
    describe("constructor", () => {
      it("new instance with BaseAudioContext", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);

        assert(context instanceof api.OfflineAudioContext);
      });

      it("default parameters", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);

        assert(context.currentTime === 0);
        assert(context.state === "suspended");
      });
    });

    describe("length", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);

        assert(context.length === 128);
      });
    });

    describe("oncomplete", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);
        const oncomplete = () => {};

        assert(context.oncomplete === null);

        context.oncomplete = oncomplete;
        assert(context.oncomplete === oncomplete);
      });
    });

    describe("startRendering", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();
        const handler3 = sinon.spy();

        context.onstatechange = handler1;
        context.oncomplete = handler2;
        context.addEventListener("complete", handler3);

        return context.startRendering().then((renderedBuffer) => {
          assert(renderedBuffer instanceof api.AudioBuffer);
          assert(context.state === "closed");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
          assert(handler3.callCount === 1);
          assert(handler2.args[0][0].renderedBuffer instanceof api.AudioBuffer);
          assert(handler3.args[0][0].renderedBuffer instanceof api.AudioBuffer);
        });
      });

      it("/OfflineAudioContext/startRendering/void: true", (done) => {
        const api = testTools.createAPI({ "/OfflineAudioContext/startRendering/void": true });
        const context = new api.OfflineAudioContext(1, 128, 44100);
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();
        const handler3 = sinon.spy();

        context.onstatechange = handler1;
        context.oncomplete = handler2;
        context.addEventListener("complete", handler3);

        assert(typeof context.startRendering() === "undefined");

        setTimeout(() => {
          assert(context.state === "closed");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
          assert(handler3.callCount === 1);
          assert(handler2.args[0][0].renderedBuffer instanceof api.AudioBuffer);
          assert(handler3.args[0][0].renderedBuffer instanceof api.AudioBuffer);
          done();
        }, 0);
      });
    });

    describe("suspend", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();

        context.onstatechange = handler1;
        context.addEventListener("statechange", handler2);

        return context.suspend(0).then(() => {
          assert(context.state === "suspended");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
        });
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);

        return context.startRendering().then(() => {
          assert.throws(() => {
            context.suspend(0);
          }, TypeError);
        });
      });
    });

    describe("resume", () => {
      it("works", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);
        const handler1 = sinon.spy();
        const handler2 = sinon.spy();

        context.onstatechange = handler1;
        context.addEventListener("statechange", handler2);

        return context.resume().then(() => {
          assert(context.state === "running");
          assert(handler1.callCount === 1);
          assert(handler2.callCount === 1);
        });
      });

      it("throws error", () => {
        const api = testTools.createAPI();
        const context = new api.OfflineAudioContext(1, 128, 44100);

        return context.startRendering().then(() => {
          assert.throws(() => {
            context.resume();
          }, TypeError);
        });
      });
    });
  });
});
