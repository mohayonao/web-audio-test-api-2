"use strict";

const namespace = require("./namespace");
const readonly  = require("./readonly");
const classprop = require("./classprop");
const whitelist = require("./whitelist");
const installer = require("./installer");
const lock = require("../utils/lock");

function apply(api, [ apiSpec, options = {} ]) {
  api.get = (path) => getAPISpec(apiSpec, path);
  api.set = (path, value) => setAPISpec(apiSpec, path, value);
  api.protected = (path) => _protected(apiSpec, path);
  api.deprecated = (path) => deprecated(apiSpec, path);

  namespace.apply(api, [ apiSpec, options ]);
  readonly .apply(api, [ apiSpec, options ]);
  classprop.apply(api, [ apiSpec, options ]);
  whitelist.apply(api, [ apiSpec, options ]);
  installer.apply(api, [ apiSpec, options ]);

  return api;
}

function getAPISpec(apiSpec, path) {
  const items = path.split("/");
  const propName = items.pop();
  const apiPath = items.join("/");

  if (apiSpec.hasOwnProperty(apiPath)) {
    if (apiSpec[apiPath].hasOwnProperty(propName)) {
      return apiSpec[apiPath][propName];
    }
  }

  return null;
}

function setAPISpec(apiSpec, path, value) {
  const items = path.split("/");
  const propName = items.pop();
  const apiPath = items.join("/");

  if (apiSpec.hasOwnProperty(apiPath)) {
    apiSpec[apiPath][propName] = value;
  }

  return value;
}

function _protected(apiSpec, path) {
  if (lock.isLocked() && apiSpec[path] && apiSpec[path]["JSDoc"]) {
    if (apiSpec[path]["JSDoc"]["protected"] && apiSpec[path]["protected"]) {
      throw new TypeError("Illegal constructor");
    }
  }
}

function deprecated(apiSpec, path) {
  if (apiSpec[path] && apiSpec[path]["JSDoc"]) {
    if (apiSpec[path]["JSDoc"]["deprecated"] && apiSpec[path]["deprecated"]) {
      const [ className, methodName ] = path.split("/").slice(1);

      throw new TypeError(`
        Failed to execute '${ methodName }' on '${ className }'.
        The ${ methodName } is deprecated.
      `.trim().replace(/^\s+/gm, "\t\t"));
    }
  }
}

module.exports = { apply };
