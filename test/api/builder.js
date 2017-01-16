
"use strict";

require("run-with-mocha");

const assert = require("assert");
const spec = require("../../src/specs/spec-201512");
const builder = require("../../src/api/builder");

describe("api/builder", () => {
  describe("api/apply(api, [ apiSpec, options ])", () => {
    it("works", () => {
      const api = {};
      const apiSpec = JSON.parse(JSON.stringify(spec.apiSpec));

      builder.apply(api, [ apiSpec, {} ]);

      assert(typeof api.AudioContext === "function");
      assert(typeof api.AudioContext.prototype.createGainNode === "undefined");
    });

    it("api.get", () => {
      const api = {};
      const apiSpec = JSON.parse(JSON.stringify(spec.apiSpec));

      builder.apply(api, [ apiSpec, {} ]);

      assert(api.get("/AudioContext/global") === "AudioContext");
      assert(api.get("/MIDIAccess/sysexEnabled") === null);
    });

    it("api.set", () => {
      const api = {};
      const apiSpec = JSON.parse(JSON.stringify(spec.apiSpec));

      builder.apply(api, [ apiSpec, {} ]);

      api.set("/AudioContext/global", "webkitAudioContext");
      api.set("/MIDIAccess/sysexEnabled", true);

      assert(api.get("/AudioContext/global") === "webkitAudioContext");
      assert(api.get("/MIDIAccess/sysexEnabled") === null);
    });
  });
});
