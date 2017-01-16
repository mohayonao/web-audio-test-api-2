"use strict";

const namespace = require("./namespace");
const readonly  = require("./readonly");
const classprop = require("./classprop");
const whitelist = require("./whitelist");
const installer = require("./installer");

function apply(api, [ apiSpec, options = {} ]) {
  api.get = (path) => getAPISpec(apiSpec, path);
  api.set = (path, value) => setAPISpec(apiSpec, path, value);

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

module.exports = { apply };
