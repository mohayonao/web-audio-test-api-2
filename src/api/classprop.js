"use strict";

function apply(api) {
  Object.keys(api).forEach((className) => {
    if (/^[A-Z]\w+$/.test(className) && typeof api[className] === "function") {
      const klass = api[className];

      Object.getOwnPropertyNames(klass.prototype).forEach((methodName) => {
        if (methodName !== "Q") {
          if (/^[A-Z_]+$/.test(methodName) && !klass.hasOwnProperty(methodName)) {
            Object.defineProperty(klass, methodName, Object.getOwnPropertyDescriptor(klass.prototype, methodName));
          }
        }
      });
    }
  });
}

module.exports = { apply };
