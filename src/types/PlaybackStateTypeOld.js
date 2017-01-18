"use strict";

const UNSCHEDULED_STATE = 0;
const SCHEDULED_STATE   = 1;
const PLAYING_STATE     = 2;
const FINISHED_STATE    = 3;
const values            = [ UNSCHEDULED_STATE, SCHEDULED_STATE, PLAYING_STATE, FINISHED_STATE ];

const PlaybackStateType = {
  UNSCHEDULED_STATE, SCHEDULED_STATE, PLAYING_STATE, FINISHED_STATE,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = PlaybackStateType;
