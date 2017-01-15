"use strict";

const { EventEmitter} = require("events");
const builder = require("../../src/api/builder");
const specs = require("../../src/specs");
const types = require("../../src/types");

function createAPI(opts = {}) {
  const apiSpec = {};

  Object.keys(specs).forEach((specName) => {
    if (specName === "spec:draft" || /\d$/.test(specName)) {
      Object.keys(specs[specName].apiSpec).forEach((apiPath) => {
        if (!apiSpec.hasOwnProperty(apiPath)) {
          apiSpec[apiPath] = {};
        }
        if (opts["merge"]) {
          Object.assign(apiSpec[apiPath], specs[specName].apiSpec[apiPath]);
        }
        if (opts["illegal"] && /^\/\w+$/.test(apiPath)) {
          apiSpec[apiPath]["constructor"] = "illegal";
        }
      });
    }
  });

  if (apiSpec["/AudioContext"]["constructor"]) {
    delete apiSpec["/AudioContext"]["constructor"];
  }

  if (apiSpec["/OfflineAudioContext"]["constructor"]) {
    delete apiSpec["/OfflineAudioContext"]["constructor"];
  }

  const api = builder.apply(new EventEmitter(), [ apiSpec ]);

  Object.keys(opts).forEach((name) => {
    if (/^\/[A-Z]\w+/.test(name)) {
      api.set(name, opts[name]);
    }
  });

  api.name = "test";
  api.apiSpec = apiSpec;
  api.types = types;

  return api;
}

function getPropertyNamesToNeed(className) {
  const list = [];

  Object.keys(specs).forEach((specName) => {
    if (specName === "spec:draft" || /\d$/.test(specName)) {
      Object.keys(specs[specName].apiSpec).forEach((apiPath) => {
        if (!apiPath.startsWith(`/${ className }/`)) {
          return;
        }
        const name = apiPath.split("/")[2];
        if (!list.includes(name)) {
          list.push(name);
        }
      });
    }
  });

  return list.sort();
}

module.exports = { createAPI, getPropertyNamesToNeed };
