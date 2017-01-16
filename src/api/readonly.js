"use strict";

function apply(api) {
  Object.keys(api).forEach((className) => {
    if (/^[A-Z]\w+$/.test(className) && typeof api[className] === "function") {
      const klass = api[className];

      Object.getOwnPropertyNames(klass.prototype).forEach((methodName) => {
        const desc = Object.getOwnPropertyDescriptor(klass.prototype, methodName);

        if (typeof desc.get === "function" && typeof desc.set === "undefined") {
          Object.defineProperty(klass.prototype, methodName, Object.assign(desc, { set: readonly(className, methodName) }));
        }
      });
    }
  });
}

function readonly(className, methodName) {
  return function() {
    const klassName = (this._ && this._.className) || className;

    throw new TypeError(`
      Faild to set the '${ methodName }' property on '${ klassName }'.
      The ${ methodName } is readonly.
    `.trim().replace(/^\s+/gm, "\t\t"));
  };
}

module.exports = { apply };
