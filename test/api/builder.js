
"use strict";

require("run-with-mocha");

const assert = require("assert");
const spec201512 = require("../../src/specs/spec-201512");
const builder = require("../../src/api/builder");

describe("api/builder", () => {
  describe("api/apply(api, [ spec ])", () => {
    it("works", () => {
      const api = {};
      const spec = JSON.parse(JSON.stringify(spec201512.spec));

      builder.apply(api, [ spec, {} ]);

      assert(typeof api.AudioContext === "function");
      assert(typeof api.AudioContext.prototype.createGainNode === "undefined");
    });

    it("api.get", () => {
      const api = {};
      const spec = JSON.parse(JSON.stringify(spec201512.spec));

      builder.apply(api, [ spec, {} ]);

      assert(api.get("/AudioContext/global") === "AudioContext");
      assert(api.get("/MIDIAccess/sysexEnabled") === null);
    });

    it("api.set", () => {
      const api = {};
      const spec = JSON.parse(JSON.stringify(spec201512.spec));

      builder.apply(api, [ spec, {} ]);

      api.set("/AudioContext/global", "webkitAudioContext");
      api.set("/MIDIAccess/sysexEnabled", true);

      assert(api.get("/AudioContext/global") === "webkitAudioContext");
      assert(api.get("/MIDIAccess/sysexEnabled") === null);
    });
  });
});
