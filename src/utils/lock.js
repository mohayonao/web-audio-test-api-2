"use strict";

let _UNLOCKED = 0;

function lock() {
  _UNLOCKED -= 1;
}

function unlock() {
  _UNLOCKED += 1;
}

function isLocked() {
  return _UNLOCKED === 0;
}

function tr(fn) {
  /* istanbul ignore next */
  if (_UNLOCKED !== 0) {
    throw new Error("lock error");
  }

  _UNLOCKED += 1;

  const result = fn();

  _UNLOCKED -= 1;

  /* istanbul ignore next */
  if (_UNLOCKED !== 0) {
    throw new Error("lock error");
  }

  return result;
}

module.exports = { lock, unlock, isLocked, tr };
