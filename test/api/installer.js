"use strict";

require("run-with-mocha");

const assert = require("assert");
const installer = require("../../src/api/installer");

describe("api/installer", () => {
  it("apply(api, [ spec ])", () => {
    const api = { "A": "A", "B": "B" };
    const spec = {
      "/A": { global: "A" },
      "/B": { global: "webkitB" },
      "/C": {},
    };
    const target = { "D": "D" };

    installer.apply(api, [ spec ]);

    api.install(target);
    assert.deepEqual(target, { "A": "A", "webkitB": "B", "D": "D" });

    target["webkitB"] =  "webkitB";

    api.uninstall(target);
    assert.deepEqual(target, { "webkitB": "webkitB", "D": "D" });
  });
});
