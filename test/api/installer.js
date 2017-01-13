"use strict";

require("run-with-mocha");

const assert = require("assert");
const installer = require("../../src/api/installer");

describe("api/installer", () => {
  it("apply(api, [ globals, options ])", () => {
    const api = { "A": "A", "B": "B" };
    const apiSpec = {
      "/A": { global: "A" },
      "/B": { global: "webkitB" },
    };
    const target = { "C": "C" };

    installer.apply(api, [ apiSpec ]);

    api.install(target);
    assert.deepEqual(target, { "A": "A", "webkitB": "B", "C": "C" });

    api.uninstall(target);
    assert.deepEqual(target, { "C": "C" });
  });
});
