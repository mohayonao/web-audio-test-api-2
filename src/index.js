"use strict";

const builder = require("./api/builder");
const specs = require("./specs");
const types = require("./types");

function createAPI(config = null) {
  const api = createAPIConfig(config);

  api.types = types;

  builder.apply(api, [ api.spec ]);

  return api;
}

function createAPIConfig(config) {
  if (config === null || typeof config === "string") {
    if (!specs.hasOwnProperty(config)) {
      config = "spec"; // TODO: replace to "recommended"
    }
    config = specs[config];
  }
  config = clone(config);

  if (typeof config.spec === "undefined") {
    const spec = {};

    Object.keys(config).forEach((key) => {
      if (key.startsWith("/")) {
        spec[key] = config[key];
        delete config[key];
      }
    });

    config.spec = spec;
  }

  if (typeof config["extends"] === "string") {
    config = extendConfig(config, config["extends"]);
  }

  if (typeof config.name !== "string") {
    config.name = "custom";
  }

  return config;
}

function extendConfig(config, baseConfigName) {
  function walk(src, dst) {
    Object.keys(src).forEach((key) => {
      if (typeof dst[key] === "undefined") {
        dst[key] = clone(src[key]);
      } else if (typeof src[key] === "object" && typeof dst[key] === "object") {
        dst[key] = walk(src[key], dst[key]);
      }
    });
    return dst;
  }

  if (specs.hasOwnProperty(baseConfigName)) {
    config = walk(specs[baseConfigName], config);
  }

  return config;
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

module.exports = { createAPI };
