"use strict";

require("run-with-mocha");

const assert = require("assert");
const ChannelMergerNodeFactory = require("../../src/factories/ChannelMergerNodeFactory");

describe("ChannelMergerNodeFactory", () => {
  it("should defined all properties", () => {
    const ChannelMergerNode = ChannelMergerNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("ChannelMergerNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ChannelMergerNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
