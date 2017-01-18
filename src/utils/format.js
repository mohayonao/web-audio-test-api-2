"use strict";

function format(str) {
  return str.trim().replace(/^\s+/gm, "\t\t");
}

module.exports = format;
