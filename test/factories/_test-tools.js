"use strict";

const { EventEmitter} = require("events");
const builder = require("../../src/api/builder");
const specs = require("../../src/specs");
const types = require("../../src/types");

function createAPI(opts = {}) {
  const spec = {};

  Object.keys(specs).forEach((specName) => {
    if (specName === "spec:draft" || /\d$/.test(specName)) {
      Object.keys(specs[specName].spec).forEach((apiPath) => {
        if (!spec.hasOwnProperty(apiPath)) {
          spec[apiPath] = {};
        }
        if (opts["merge"]) {
          Object.assign(spec[apiPath], specs[specName].spec[apiPath]);
        }
        if (opts["protected"] && /^\/\w+$/.test(apiPath)) {
          spec[apiPath]["protected"] = true;
        }
        if (opts["disabled"]) {
          if (typeof opts["disabled"] === "string") {
            if (apiPath.startsWith(opts["disabled"])) {
              delete spec[apiPath];
            }
          }
          if (opts["disabled"] instanceof RegExp) {
            if (opts["disabled"].test(apiPath)) {
              delete spec[apiPath];
            }
          }
        }
      });
    }
  });

  if (spec["/AudioContext"]["constructor"]) {
    delete spec["/AudioContext"]["constructor"];
  }

  if (spec["/OfflineAudioContext"]["constructor"]) {
    delete spec["/OfflineAudioContext"]["constructor"];
  }

  const api = builder.apply(new EventEmitter(), [ spec ]);

  Object.keys(opts).forEach((name) => {
    if (/^\/[A-Z]\w+/.test(name)) {
      api.set(name, opts[name]);
    }
  });

  api.name = "test";
  api.spec = spec;
  api.types = types;

  return api;
}

function getPropertyNamesToNeed(className) {
  const list = [];

  Object.keys(specs).forEach((specName) => {
    if (specName === "spec:draft" || /\d$/.test(specName)) {
      Object.keys(specs[specName].spec).forEach((apiPath) => {
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
