"use strict";

function apply(api, [ apiSpec ]) {
  const map = buildAPIMap(apiSpec);

  Object.keys(map).forEach((className) => {
    if (api[className]) {
      const klass = api[className];
      const proto = klass.prototype;

      // Delete class properties not included apiSpec
      Object.getOwnPropertyNames(klass).forEach((name) => {
        if (/^[A-Z_]+$/.test(name)) {
          if (!map[className].includes(name)) {
            delete klass[name];
          }
        }
      });

      // Delete instance properties not included apiSpec
      Object.getOwnPropertyNames(proto).forEach((name) => {
        if (name !== "constructor") {
          if (!map[className].includes(name)) {
            delete proto[name];
          }
        }
      });
    }
  });

  return api;
}

function buildAPIMap(apiSpec) {
  const map = {};

  Object.keys(apiSpec).forEach((apiPath) => {
    const [ className, methodName ] = apiPath.split("/").slice(1);

    if (!map[className]) {
      map[className] = [];
    }

    if (methodName) {
      map[className].push(methodName);
    }
  });

  return map;
}

module.exports = { apply };
