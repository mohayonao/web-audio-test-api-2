"use strict";

function check(api, type, value) {
  if (/^\(.+\)/.test(type)) {
    return type.slice(1, -1).split("|").some(type => check(api, type, value));
  }
  if (/^Array\.<.+>$/.test(type)) {
    type = type.slice(7, -1);
    return typeof value.every === "function" &&
      value.every(value => check(api, type, value));
  }
  if (type.endsWith("?")) {
    if (value === null) {
      return true;
    }
    type = type.slice(0, -1);
  }
  if (type === "number" || type === "boolean" || type === "string" || type === "function") {
    return typeof value === type;
  }
  if (type === "object") {
    return value !== null && typeof value === "object";
  }

  const className = (value && value._ && value._.className) || "";

  if (type === className) {
    return true;
  }
  if (type === "BaseAudioContext") {
    return className === "AudioContext" || className === "OfflineAudioContext";
  }
  if (typeof global[type] === "function") {
    return value instanceof global[type];
  }
  if (typeof api[type] === "function") {
    return value instanceof api[type];
  }
  if (api.types && api.types[type] && typeof api.types[type][Symbol.hasInstance] === "function") {
    return api.types[type][Symbol.hasInstance](value);
  }
  return false;
}

function toString(value) {
  if (value === null || value === undefined) {
    return "" + value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return "" + value;
  }
  if (typeof value === "string") {
    return `"${ value }"`;
  }
  if (typeof value === "function") {
    return "function";
  }
  if (value && value._ && value._.className) {
    return value._.className;
  }

  return Object.prototype.toString.call(value).slice(8, -1);
}

module.exports = { check, toString };
