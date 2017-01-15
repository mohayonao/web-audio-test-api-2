"use strict";

const UNSCHEDULED_STATE = "unscheduled";
const SCHEDULED_STATE   = "scheduled";
const PLAYING_STATE     = "playing";
const FINISHED_STATE    = "finished";
const values            = [ UNSCHEDULED_STATE, SCHEDULED_STATE, PLAYING_STATE, FINISHED_STATE ];

const PlaybackStateType = {
  UNSCHEDULED_STATE, SCHEDULED_STATE, PLAYING_STATE, FINISHED_STATE,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  },
  [Symbol.toStringTag]() {
    return `PlaybackStateType { ${ values.join(", ") } }`;
  },
};

module.exports = PlaybackStateType;
