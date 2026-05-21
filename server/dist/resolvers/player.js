"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerResolvers = void 0;
const playerService_1 = require("../services/playerService");
const auth_1 = require("../utils/auth");
const errors_1 = require("../utils/errors");
exports.playerResolvers = {
    Query: {
        me: async (_, __, context) => {
            const user = (0, auth_1.requireUser)(context.user);
            const player = await context.prisma.player.findUnique({
                where: { id: user.id },
            });
            if (!player) {
                throw (0, errors_1.validationError)('Player not found');
            }
            return player;
        },
        leaderboard: async (_, { difficulty, limit }, context) => {
            const safeLimit = Math.min(Math.max(limit ?? 10, 1), 50);
            const entries = await (0, playerService_1.getLeaderboard)(context.prisma, difficulty, safeLimit);
            return entries;
        },
    },
    Player: {
        stats: async (player, _, context) => (0, playerService_1.getPlayerStats)(context.prisma, player.id),
        recentMatches: async (player, { limit }, context) => (0, playerService_1.getRecentMatches)(context.prisma, player.id, limit ?? 10),
    },
};
