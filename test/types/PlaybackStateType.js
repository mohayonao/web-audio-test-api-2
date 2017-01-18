"use strict";

require("run-with-mocha");

const assert = require("assert");
const PlaybackStateType = require("../../src/types/PlaybackStateType");

describe("types/PlaybackStateType", () => {
  it("Symbol.hasInstance", () => {
    [
      PlaybackStateType.UNSCHEDULED_STATE, "unscheduled",
      PlaybackStateType.SCHEDULED_STATE, "scheduled",
      PlaybackStateType.PLAYING_STATE, "playing",
      PlaybackStateType.FINISHED_STATE, "finished",
    ].forEach((value) => {
      assert(PlaybackStateType[Symbol.hasInstance](value));
    });
  });
});
