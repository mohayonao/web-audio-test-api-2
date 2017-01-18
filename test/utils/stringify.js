"use strict";

require("run-with-mocha");

const assert = require("assert");
const stringify = require("../../src/utils/stringify");

describe("utils/stringify", () => {
  it("null/undefined", () => {
    assert(stringify(null) === "null");
    assert(stringify(void 0) === "undefined");
  });

  it("number/boolean", () => {
    assert(stringify(10) === "10");
    assert(stringify(1.0) === "1");
    assert(stringify(-Infinity) === "-Infinity");
    assert(stringify(true) === "true");
  });

  it("string", () => {
    assert(stringify("100") === '"100"');
  });

  it("function", () => {
    assert(stringify(() => {}) === "function");
  });

  it("_.className", () => {
    const obj = { _: { className: "MyClass" } };

    assert(stringify(obj) === "MyClass");
  });

  it("else", () => {
    assert(stringify([]) === "Array");
    assert(stringify(new Float32Array) === "Float32Array");
  });
});
