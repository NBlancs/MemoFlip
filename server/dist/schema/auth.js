"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
exports.authSchema = `
  type AuthPayload {
    token: String!
    player: Player!
  }

  input RegisterInput {
    email: String!
    password: String!
    displayName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;
