
"use strict";

require("run-with-mocha");

const assert = require("assert");
const spec = require("../../src/specs/spec-201512");
const builder = require("../../src/api/builder");

describe("api/builder", () => {
  describe("api/apply(api, [ apiSpec, options ])", () => {
    it("works", () => {
      const api = {};

      builder.apply(api, [ spec.apiSpec, {} ]);

      assert(typeof api.AudioContext === "function");
      assert(typeof api.AudioContext.prototype.createGainNode === "undefined");
    });
  });
});
