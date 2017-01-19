"use strict";

const builder = require("./api/builder");
const specs = require("./specs");
const types = require("./types");

function createAPI(spec = null, opts = {}) {
  const api = { types };

  if (spec && typeof spec === "object") {
    if (typeof spec["name"] === "string") {
      api.name = spec["name"];
    } else {
      api.name = "custom";
    }
    if (typeof spec["released"] === "string") {
      api.released = spec["released"];
    } else {
      api.released = "custom";
    }
    if (typeof spec["spec"] === "object") {
      api.spec = clone(spec["spec"]);
    } else {
      api.spec = clone(spec);
    }
  }

  let specName = spec;

  if (typeof api.name === "undefined") {
    if (!specs.hasOwnProperty(specName)) {
      specName = "spec";
    }
    const { name, released, spec } = specs[specName];

    api.name = name;
    api.released = released;
    api.spec = clone(spec);
  }

  const customSpec = opts.spec || opts;

  Object.keys(customSpec).forEach((key) => {
    if (key.startsWith("/")) {
      api.spec[key] = Object.assign({}, api.spec[key], customSpec[key]);
    }
  });

  builder.apply(api, [ api.spec, opts ]);

  return api;
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

module.exports = { createAPI };
