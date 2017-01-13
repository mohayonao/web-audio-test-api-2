"use strict";

const namespace = require("./namespace");
const whitelist = require("./whitelist");
const installer = require("./installer");

function apply(api, [ apiSpec, options = {} ]) {
  namespace.apply(api, [ apiSpec, options ]);
  whitelist.apply(api, [ apiSpec, options ]);
  installer.apply(api, [ apiSpec, options ]);
  return api;
}

module.exports = { apply };
