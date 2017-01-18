"use strict";

const doctrine = require("doctrine");

function format(str) {
  return str.trim().replace(/^\s+/gm, "\\t\\t").replace(/\n/g, "\\n");
}

function isEmpty(object) {
  return Object.keys(object).length === 0;
}

function last(array) {
  return array && array[array.length - 1];
}

function toMethodName(methodName) {
  return methodName.split("$")[0];
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
        doc[tag.title] = tag.description || true;
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
      const methodName = toMethodName(node.key.name);
      const apiPath = toAPIPath(kind, className, methodName);
      const lastComment = last(node.leadingComments);
      const doc = parseJSDoc(lastComment);
      const variables = collectVariables(node.params);

      this.JSDoc[apiPath] = Object.assign({}, this.JSDoc[apiPath], doc);

      if (isEmpty(this.JSDoc[apiPath])) {
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

      if (this.JSDoc[apiPath].args && kind === "constructor") {
        path.traverse(ClassConstructorVisitor, { apiPath, args: this.JSDoc[apiPath].args });
      }

      // argumnets checker
      if (this.JSDoc[apiPath].args && (kind === "set" || kind === "method")) {
        const lines = this.JSDoc[apiPath].args.filter(({ name }) => {
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
      if (kind === "constructor" && this.JSDoc[apiPath]["protected"]) {
        let message = `Failed to construct '${ className }':\nIllegal constructor`;

        if (typeof this.JSDoc[apiPath]["protected"] === "string") {
          message += `, please use '${ this.JSDoc[apiPath]["protected"] }' instead.`;
        }

        path.get("body").unshiftContainer("body", template(`
          if (lock.isLocked() && typeof api.get === "function" && api.get("${ apiPath }/protected")) {
            throw new TypeError("${ format(message) }");
          }
        `)());
      }

      // deprecated
      if (this.JSDoc[apiPath]["deprecated"]) {
        let message = "";

        if (kind === "constructor") {
          message = `Failed to construct '${ className }':\nThe ${ className } is deprecated.`;
        }
        if (kind === "get") {
          message = `Failed to get the '${ methodName }' property:\nThe ${ methodName } is deprecated.`;
        }
        if (kind === "set") {
          message = `Failed to set the '${ methodName }' property:\nThe ${ methodName } is deprecated.`;
        }
        if (kind === "method") {
          message = `Failed to execute '${ methodName }':\nThe ${ methodName } is deprecated.`;
        }

        path.get("body").unshiftContainer("body", template(`
          if (typeof api.get === "function" && api.get("${ apiPath }/deprecated")) {
            throw new TypeError("${ format(message) }");
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
        const JSDoc = {};

        path.traverse(ClassDeclarationVisitor, { className, JSDoc });
      }
    }
  };
};
