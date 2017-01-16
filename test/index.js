"use strict";

require("run-with-mocha");

const assert = require("assert");
const { createAPI } = require("../src");

describe("index", () => {
  describe("createAPI(name, options)", () => {
    it("create api", () => {
      const api = createAPI();

      assert(typeof api.AudioContext === "function");
    });

    it("create api with name", () => {
      const api = createAPI("spec:201310");

      assert(typeof api.AudioContext === "function");
      assert(api.name === "spec:201310");
    });
  });
});
