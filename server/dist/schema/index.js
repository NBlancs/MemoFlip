"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const auth_1 = require("./auth");
const match_1 = require("./match");
const player_1 = require("./player");
const baseSchema = `
  scalar DateTime

  enum Difficulty {
    EASY
    NORMAL
    HARD
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
exports.typeDefs = [baseSchema, auth_1.authSchema, player_1.playerSchema, match_1.matchSchema].join('\n');
