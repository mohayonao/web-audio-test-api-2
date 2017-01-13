"use strict";

const builder = require("./api/builder");
const specs = require("./specs");

function createAPI(name, options = {}) {
  if (!specs.hasOwnProperty(name)) {
    name = "spec";
  }

  const { fullName, apiSpec } = specs[name];
  const api = { name, fullName, apiSpec };

  builder.apply(api, [ apiSpec, options ]);

  return api;
}

module.exports = { createAPI };
