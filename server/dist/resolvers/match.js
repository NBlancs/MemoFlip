"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchResolvers = void 0;
const matchService_1 = require("../services/matchService");
const auth_1 = require("../utils/auth");
exports.matchResolvers = {
    Mutation: {
        submitMatch: async (_, { input }, context) => {
            const user = (0, auth_1.requireUser)(context.user);
            return (0, matchService_1.submitMatch)(context.prisma, user.id, input);
        },
    },
};
