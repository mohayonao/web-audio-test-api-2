"use strict";

const namespace = require("./namespace");
const whitelist = require("./whitelist");
const installer = require("./installer");

function apply(api, [ apiSpec, options = {} ]) {
  namespace.apply(api, [ apiSpec, options ]);
  whitelist.apply(api, [ apiSpec, options ]);
  installer.apply(api, [ apiSpec, options ]);

  api.set = (path, value) => setAPISpec(apiSpec, path, value);
  api.get = (path) => getAPISpec(apiSpec, path);

  return api;
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

module.exports = { apply };
