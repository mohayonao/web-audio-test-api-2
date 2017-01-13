"use strict";

require("run-with-mocha");

const assert = require("assert");
const ChannelSplitterNodeFactory = require("../../src/factories/ChannelSplitterNodeFactory");

describe("ChannelSplitterNodeFactory", () => {
  it("should defined all properties", () => {
    const ChannelSplitterNode = ChannelSplitterNodeFactory.create({}, class {});
    const properties = require("./_test-tools").getPropertyNamesToNeed("ChannelSplitterNode");
    const notDefined = properties.filter((name) => {
      return !Object.getOwnPropertyDescriptor(ChannelSplitterNode.prototype, name);
    });
    assert(notDefined.length === 0);
  });
});
