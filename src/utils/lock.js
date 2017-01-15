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
  if (_UNLOCKED !== 0) {
    throw new Error("lock error");
  }

  _UNLOCKED += 1;

  const result = fn();

  _UNLOCKED -= 1;

  if (_UNLOCKED !== 0) {
    throw new Error("lock error");
  }

  return result;
}

function checkIllegalConstructor(api, apiPath) {
  if (_UNLOCKED === 0 && api && api.apiSpec) {
    if (!api.apiSpec[apiPath] || api.apiSpec[apiPath]["constructor"] === "illegal") {
      return true;
    }
  }
  return false;
}

module.exports = { lock, unlock, isLocked, tr, checkIllegalConstructor };
