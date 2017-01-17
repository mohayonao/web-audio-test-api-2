"use strict";

function apply(api, [ spec ]) {
  const map = buildAPIMap(spec);

  Object.keys(map).forEach((className) => {
    if (api[className]) {
      const klass = api[className];
      const proto = klass.prototype;

      // Delete class properties not included spec
      Object.getOwnPropertyNames(klass).forEach((name) => {
        if (/^[A-Z_]+$/.test(name)) {
          if (!map[className].includes(name)) {
            delete klass[name];
          }
        }
      });

      // Delete instance properties not included spec
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

function buildAPIMap(spec) {
  const map = {};

  Object.keys(spec).forEach((apiPath) => {
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
