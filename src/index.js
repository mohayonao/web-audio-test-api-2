"use strict";

const { EventEmitter } = require("events");
const builder = require("./api/builder");
const specs = require("./specs");
const types = require("./types");

function createAPI(specName, options = {}) {
  if (!specs.hasOwnProperty(specName)) {
    specName = "spec";
  }

  const { spec, name } = specs[specName];
  const api = new EventEmitter();

  api.name = name;
  api.spec = clone(spec);
  api.types = types;

  builder.apply(api, [ api.spec, options ]);

  return api;
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

module.exports = { createAPI };
