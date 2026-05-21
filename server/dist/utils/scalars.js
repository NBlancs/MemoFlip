"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeScalar = void 0;
const graphql_1 = require("graphql");
exports.DateTimeScalar = new graphql_1.GraphQLScalarType({
    name: 'DateTime',
    serialize(value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return new Date(value).toISOString();
    },
    parseValue(value) {
        if (typeof value !== 'string') {
            throw new Error('DateTime must be a string');
        }
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new Error('DateTime must be a string');
        }
        return new Date(ast.value);
    },
});
