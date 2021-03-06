"use strict";

const SUSPENDED = "suspended";
const RUNNING   = "running";
const CLOSED    = "closed";
const values    = [ SUSPENDED, RUNNING, CLOSED ];

const AudioContextState = {
  SUSPENDED, RUNNING, CLOSED,
  [Symbol.hasInstance](value) {
    return values.includes(value);
  }
};

module.exports = AudioContextState;
