"use strict";

const { EventEmitter } = require("events");
const builder = require("./api/builder");
const specs = require("./specs");
const types = require("./types");

function createAPI(name, options = {}) {
  if (!specs.hasOwnProperty(name)) {
    name = "spec";
  }

  const spec = specs[name];
  const api = new EventEmitter();

  api.name = spec.name;
  api.apiSpec = clone(spec.apiSpec);
  api.types = types;

  builder.apply(api, [ api.apiSpec, options ]);

  return api;
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

module.exports = { createAPI };
