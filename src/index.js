const recast = require("recast");
const typescriptParser = require("recast/parsers/typescript");

function toggleStringClassPropertyDefinite(source, { targetIdentifierName }) {
  const ast = recast.parse(source, { parser: typescriptParser });

  recast.visit(ast, {
    visitClassProperty(path, methods) {
      try {
        const {
          node: {
            key: { type: keyType, name: keyName },
            definite,
            typeAnnotation: {
              typeAnnotation: { type: typeAnnotationType },
            },
            value,
          },
        } = path;

        if (
          keyType === "Identifier" &&
          keyName === targetIdentifierName &&
          typeAnnotationType === "TSStringKeyword" &&
          value === null
        ) {
          path.node.definite = !Boolean(definite);

          return false;
        }
      } finally {
        return false;
      }
    },
  });

  return recast.print(ast).code;
}

module.exports = {
  toggleStringClassPropertyDefinite,
};
