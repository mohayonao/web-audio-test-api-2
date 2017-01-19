"use strict";

require("run-with-mocha");

const assert = require("assert");
const spec201512 = require("../src/specs/spec-201512");
const { createAPI } = require("../src");

describe("index", () => {
  describe("createAPI(name, options)", () => {
    it("create api without params", () => {
      const api = createAPI();

      assert(typeof api.name === "string");
      assert(typeof api.released === "string");
    });

    it("create api with name", () => {
      const api = createAPI("spec:201310");

      assert(api.name === "spec:201310");
      assert(typeof api.released === "string");
    });

    it("create api with full spec", () => {
      const api = createAPI(spec201512);

      assert(api.name === spec201512.name);
      assert(api.released === spec201512.released);
      assert(api.spec !== spec201512.spec);
      assert.deepEqual(api.spec, spec201512.spec);
    });

    it("create api with spec.spec", () => {
      const api = createAPI(spec201512.spec);

      assert(api.name === "custom");
      assert(api.released === "custom");
      assert.deepEqual(api.spec, spec201512.spec);
    });

    it("create api with opts", () => {
      const api = createAPI(spec201512.spec, {
        "/BaseAudioContext/createBuffer": { "mixToMono": true }
      });

      assert(api.name === "custom");
      assert(api.released === "custom");
      assert.notDeepEqual(api.spec, spec201512.spec);
      assert(api.spec["/BaseAudioContext/createBuffer"]["mixToMono"]);
      assert(!spec201512.spec["/BaseAudioContext/createBuffer"]["mixToMono"]);
    });
  });
});
