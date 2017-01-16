"use strict";

const doctrine = require("doctrine");
const JSDoc = {};

function isEmpty(object) {
  return Object.keys(object).length === 0;
}

function last(array) {
  return array && array[array.length - 1];
}

function toAPIPath(kind, className, methodName) {
  if (kind === "constructor") {
    return `/${ className }`;
  }
  return `/${ className }/${ methodName }`;
}

function parseJSDoc(comment) {
  const doc = {};

  if (comment && comment.type === "CommentBlock") {
    doctrine.parse(comment.value, { unwrap: true }).tags.forEach((tag) => {
      if ([ "deprecated", "protected" ].includes(tag.title)) {
        doc[tag.title] = true;
      }
      if (tag.title === "type" || tag.title === "param") {
        const name = tag.name || "value";
        const type = doctrine.type.stringify(tag.type, { compact: true });

        if (!doc["args"]) {
          doc["args"] = [ { name, type } ];
        } else {
          doc["args"].push({ name, type });
        }
      }
    });
  }

  return doc;
}

function collectVariables(params) {
  return params.map((param) => {
    if (param.type === "Identifier") {
      return param.name;
    }
    if (param.type === "AssignmentPattern") {
      return param.left.name;
    }
  }).filter(x => x);
}

module.exports = ({ template }) => {
  const ClassDeclarationVisitor = {
    ["ClassMethod"](path) {
      const { node } = path;
      const { kind } = node;
      const className = this.className;
      const methodName = node.key.name;
      const apiPath = toAPIPath(kind, className, methodName);
      const lastComment = last(node.leadingComments);
      const doc = parseJSDoc(lastComment);
      const variables = collectVariables(node.params);

      JSDoc[apiPath] = Object.assign({}, JSDoc[apiPath], doc);

      if (isEmpty(JSDoc[apiPath])) {
        return;
      }

      // insert validate
      if (kind === "set" || kind === "method") {
        path.get("body").unshiftContainer("body", template(`
          if (typeof api.validate === "function") {
            api.validate(this, "${ apiPath }", { ${ variables.join(", ") } });
          }
        `)());
      }

      if (JSDoc[apiPath].args && kind === "constructor") {
        path.traverse(ClassConstructorVisitor, { apiPath, args: JSDoc[apiPath].args });
      }

      // argumnets checker
      if (JSDoc[apiPath].args && (kind === "set" || kind === "method")) {
        const lines = JSDoc[apiPath].args.filter(({ name }) => {
          return /^[a-z]\w*$/.test(name);
        }).map(({ name, type }) => {
          return `api.typecheck("${ apiPath }", "${ type }", ${ name }, "${ name }");`
        });

        path.get("body").unshiftContainer("body", template(`
          if (typeof api.typecheck === "function") {
            ${ lines.join("\n") }
          }
        `)());
      }

      // protected
      if (kind === "constructor" && JSDoc[apiPath]["protected"]) {
        path.get("body").unshiftContainer("body", template(`
          if (typeof api.protected === "function") {
            api.protected("${ apiPath }");
          }
        `)());
      }

      // deprecated
      if (JSDoc[apiPath]["deprecated"]) {
        path.get("body").unshiftContainer("body", template(`
          if (typeof api.deprecated === "function") {
            api.deprecated("${ apiPath }");
          }
        `)());
      }
    }
  };

  const ClassConstructorVisitor = {
    ["ExpressionStatement"](path) {
      const { node } = path;
      const apiPath = this.apiPath;

      if (node.expression.callee && node.expression.callee.type === "Super") {
        const variables = this.args.map(({ name, type }) => {
          if (/^opts\.\w+$/.test(name)) {
            name = name.slice(5);
          }
          return { name, type };
        });
        const lines = variables.map(({ type, name }) => {
          return `api.typecheck("${ apiPath }", "${ type }", ${ name }, "${ name }");`
        });

        path.insertBefore(template(`
          if (typeof api.typecheck === "function") {
            ${ lines.join("\n") }
          }
        `)());

        path.insertAfter(template(`
          if (typeof api.validate === "function") {
            api.validate(this, "${ apiPath }", { ${ variables.map(({ name }) => name).join(", ") } });
          }
        `)());
      }
    }
  };

  return {
    visitor: {
      ["ClassDeclaration"](path) {
        const className = path.node.id.name;

        path.traverse(ClassDeclarationVisitor, { className });

        const lines = Object.keys(JSDoc).filter((apiPath) => {
          return apiPath.startsWith(`/${ className }`);
        }).map((apiPath) => {
          const doc = {};

          Object.keys(JSDoc[apiPath]).forEach((key) => {
            if (JSDoc[apiPath][key] === true) {
              doc[key] = true;
            }
          });

          return { apiPath, doc };
        }).filter(({ doc }) => {
          return !isEmpty(doc);
        }).map(({ apiPath, doc }) => {
          return `api.set("${ apiPath }/JSDoc", ${ JSON.stringify(doc) });`;
        });

        if (lines.length) {
          path.insertAfter(template(`
            if (typeof api.set === "function") {
              ${ lines.join("\n") }
            }
          `)());
        }
      }
    }
  };
};
