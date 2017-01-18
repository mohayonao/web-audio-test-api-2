"use strict";

const builder = require("./api/builder");
const specs = require("./specs");
const types = require("./types");

function createAPI(specName, options = {}) {
  if (!specs.hasOwnProperty(specName)) {
    specName = "spec";
  }

  const { name, released, spec } = specs[specName];
  const api = {};

  api.name = name;
  api.released = released;
  api.spec = clone(spec);
  api.types = types;

  builder.apply(api, [ api.spec, options ]);

  return api;
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

module.exports = { createAPI };
