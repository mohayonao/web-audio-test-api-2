"use strict";

const namespace = require("./namespace");
const readonly  = require("./readonly");
const classprop = require("./classprop");
const whitelist = require("./whitelist");
const installer = require("./installer");
const format = require("../utils/format");
const lock = require("../utils/lock");
const stringify = require("../utils/stringify");

function apply(api, [ spec, options = {} ]) {
  api.get = (path) => getSpec(spec, path);
  api.set = (path, value) => setSpec(spec, path, value);
  api.protected = (path) => _protected(spec, path);
  api.deprecated = (path) => deprecated(spec, path);
  api.typecheck = (path, type, value, name) => typecheck(api, path, type, value, name);

  namespace.apply(api, [ spec, options ]);
  readonly .apply(api, [ spec, options ]);
  classprop.apply(api, [ spec, options ]);
  whitelist.apply(api, [ spec, options ]);
  installer.apply(api, [ spec, options ]);

  return api;
}

function getSpec(spec, path) {
  const items = path.split("/");
  const propName = items.pop();
  const apiPath = items.join("/");

  if (spec.hasOwnProperty(apiPath)) {
    if (spec[apiPath].hasOwnProperty(propName)) {
      return spec[apiPath][propName];
    }
  }

  return null;
}

function setSpec(spec, path, value) {
  const items = path.split("/");
  const propName = items.pop();
  const apiPath = items.join("/");

  if (spec.hasOwnProperty(apiPath)) {
    spec[apiPath][propName] = value;
  }

  return value;
}

function _protected(spec, path) {
  if (lock.isLocked() && spec[path] && spec[path]["JSDoc"]) {
    if (spec[path]["JSDoc"]["protected"] && spec[path]["protected"]) {
      throw new TypeError("Illegal constructor");
    }
  }
}

function deprecated(spec, path) {
  if (spec[path] && spec[path]["JSDoc"]) {
    if (spec[path]["JSDoc"]["deprecated"] && spec[path]["deprecated"]) {
      const [ className, methodName ] = path.split("/").slice(1);
      const message = methodName ?
        `
          Failed to execute '${ methodName }' on '${ className }'.
          The ${ methodName } is deprecated.
        `
        :
        `
          Failed to construct '${ className }'.
          The ${ className } is deprecated.
        `;

      throw new TypeError(format(message));
    }
  }
}

function typecheck(api, path, type, value, name) {
  if (!check(api, type, value)) {
    const [ className, methodName ] = path.split("/").slice(1);
    const caption = methodName ?
      name === "value" ?
      `Failed to set the '${ methodName }' property on '${ className }'`
      :
      `Failed to execute '${ methodName }' on ${ className }`
      :
      `Failed to construct '${ className }'`;
    const message = `
      ${ caption }:
      The parameter '${ name }' must be ${ type }, but got ${ stringify(value) }.
    `;

    throw new TypeError(format(message));
  }
}

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

module.exports = { apply };
