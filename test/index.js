"use strict";

require("run-with-mocha");

const assert = require("assert");
const { createAPI } = require("../src");

describe("index", () => {
  describe("createAPI(name, options)", () => {
    it("works", () => {
      const api = createAPI();

      assert(typeof api.AudioContext === "function");
    });
  });
});
