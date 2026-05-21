"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitMatch = void 0;
const matchValidator_1 = require("../validators/matchValidator");
const submitMatch = async (prisma, playerId, input) => {
    const { config, ...data } = (0, matchValidator_1.validateMatchInput)(input);
    return prisma.matchSession.create({
        data: {
            playerId,
            difficulty: data.difficulty,
            moves: data.moves,
            elapsedSeconds: data.elapsedSeconds,
            gridRows: data.gridRows ?? config.rows,
            gridCols: data.gridCols ?? config.cols,
        },
    });
};
exports.submitMatch = submitMatch;
