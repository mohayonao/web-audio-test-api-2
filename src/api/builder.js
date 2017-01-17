"use strict";

const namespace = require("./namespace");
const readonly  = require("./readonly");
const classprop = require("./classprop");
const whitelist = require("./whitelist");
const installer = require("./installer");
const lock = require("../utils/lock");
const format = require("../utils/format");
const typeChecker = require("../utils/typeChecker");

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
  if (!typeChecker.check(api, type, value)) {
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
      The parameter '${ name }' must be ${ type }, but got ${ typeChecker.toString(value) }.
    `;

    throw new TypeError(format(message));
  }
}

module.exports = { apply };
