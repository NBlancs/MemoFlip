"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentMatches = exports.getLeaderboard = exports.getPlayerStats = void 0;
const errors_1 = require("../utils/errors");
const getPlayerStats = async (prisma, playerId) => {
    const aggregates = await prisma.matchSession.groupBy({
        by: ['difficulty'],
        where: { playerId },
        _min: { elapsedSeconds: true, moves: true },
        _avg: { moves: true },
        _count: { _all: true },
    });
    const stats = {
        totalMatches: 0,
        bestTimeEasy: null,
        bestTimeNormal: null,
        bestTimeHard: null,
        bestMovesEasy: null,
        bestMovesNormal: null,
        bestMovesHard: null,
        averageMovesEasy: null,
        averageMovesNormal: null,
        averageMovesHard: null,
    };
    for (const row of aggregates) {
        stats.totalMatches += row._count._all;
        if (row.difficulty === 'EASY') {
            stats.bestTimeEasy = row._min.elapsedSeconds ?? null;
            stats.bestMovesEasy = row._min.moves ?? null;
            stats.averageMovesEasy = row._avg.moves ?? null;
        }
        if (row.difficulty === 'NORMAL') {
            stats.bestTimeNormal = row._min.elapsedSeconds ?? null;
            stats.bestMovesNormal = row._min.moves ?? null;
            stats.averageMovesNormal = row._avg.moves ?? null;
        }
        if (row.difficulty === 'HARD') {
            stats.bestTimeHard = row._min.elapsedSeconds ?? null;
            stats.bestMovesHard = row._min.moves ?? null;
            stats.averageMovesHard = row._avg.moves ?? null;
        }
    }
    return stats;
};
exports.getPlayerStats = getPlayerStats;
const getLeaderboard = async (prisma, difficulty, limit) => {
    const grouped = await prisma.matchSession.groupBy({
        by: ['playerId'],
        where: { difficulty },
        _min: { elapsedSeconds: true, moves: true },
    });
    const ordered = grouped
        .sort((a, b) => {
        const timeDiff = (a._min.elapsedSeconds ?? 0) - (b._min.elapsedSeconds ?? 0);
        if (timeDiff !== 0)
            return timeDiff;
        return (a._min.moves ?? 0) - (b._min.moves ?? 0);
    })
        .slice(0, limit);
    const players = await prisma.player.findMany({
        where: { id: { in: ordered.map((entry) => entry.playerId) } },
    });
    const playerMap = new Map(players.map((player) => [player.id, player]));
    return ordered.map((entry) => {
        const player = playerMap.get(entry.playerId);
        if (!player) {
            throw (0, errors_1.validationError)('Leaderboard player not found');
        }
        return {
            player,
            bestTime: entry._min.elapsedSeconds ?? 0,
            bestMoves: entry._min.moves ?? 0,
        };
    });
};
exports.getLeaderboard = getLeaderboard;
const getRecentMatches = async (prisma, playerId, limit) => prisma.matchSession.findMany({
    where: { playerId },
    orderBy: { createdAt: 'desc' },
    take: limit,
});
exports.getRecentMatches = getRecentMatches;
