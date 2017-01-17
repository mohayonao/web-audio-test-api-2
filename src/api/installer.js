"use strict";

function apply(api, [ spec ]) {
  function install(target = global) {
    Object.keys(spec).forEach((apiPath) => {
      const className = apiPath.split("/")[1];
      const exportName = spec[apiPath]["global"];

      if (exportName && api[className]) {
        target[exportName] = api[className];
      }
    });
    return api;
  }

  function uninstall(target = global) {
    Object.keys(spec).forEach((apiPath) => {
      const className = apiPath.split("/")[1];
      const exportName = spec[apiPath]["global"];

      if (exportName && api[className]) {
        if (target[exportName] === api[className]) {
          delete target[exportName];
        }
      }
    });
    return api;
  }

  api.install = install;
  api.uninstall = uninstall;

  return api;
}

module.exports = { apply };
