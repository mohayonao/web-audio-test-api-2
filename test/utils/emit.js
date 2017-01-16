"use strict";

require("run-with-mocha");

const assert = require("assert");
const sinon = require("sinon");
const { EventEmitter } = require("events");
const emit = require("../../src/utils/emit");

describe("utils/emit(instance, type, ...args)", () => {
  it("works", () => {
    const instance = {
      _: {
        emitter: new EventEmitter(),
      },
    };
    const handler1 = sinon.spy();

    instance._.emitter.on("ended", handler1);

    emit(instance, "ended", "arg1", "arg2");

    assert(handler1.callCount === 1);
    assert.deepEqual(handler1.args[0], [ "arg1", "arg2" ]);
  });

  it("works with onxxxx", () => {
    const instance = {};
    const handler1 = sinon.spy();

    instance.onended = handler1;

    emit(instance, "ended", "arg1", "arg2");

    assert(handler1.callCount === 1);
    assert.deepEqual(handler1.args[0], [ "arg1", "arg2" ]);
  });
});
