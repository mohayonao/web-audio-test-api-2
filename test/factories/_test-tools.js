"use strict";

const specs = require("../../src/specs");

function getPropertyNamesToNeed(className) {
  const list = [];

  Object.keys(specs).forEach((specName) => {
    if (specName === "spec:draft" || /\d$/.test(specName)) {
      Object.keys(specs[specName].apiSpec).forEach((apiPath) => {
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

module.exports = { getPropertyNamesToNeed };
