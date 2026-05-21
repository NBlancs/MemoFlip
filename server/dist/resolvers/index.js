"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const scalars_1 = require("../utils/scalars");
const auth_1 = require("./auth");
const match_1 = require("./match");
const player_1 = require("./player");
exports.resolvers = {
    DateTime: scalars_1.DateTimeScalar,
    Query: {
        ...player_1.playerResolvers.Query,
    },
    Mutation: {
        ...auth_1.authResolvers.Mutation,
        ...match_1.matchResolvers.Mutation,
    },
    Player: player_1.playerResolvers.Player,
};
