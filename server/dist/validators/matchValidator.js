"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMatchInput = void 0;
const zod_1 = require("zod");
const antiCheat_1 = require("../utils/antiCheat");
const errors_1 = require("../utils/errors");
const submitMatchSchema = zod_1.z.object({
    difficulty: zod_1.z.enum(['EASY', 'MEDIUM']),
    moves: zod_1.z.number().int().positive(),
    elapsedSeconds: zod_1.z.number().int().positive(),
    gridRows: zod_1.z.number().int().positive().optional(),
    gridCols: zod_1.z.number().int().positive().optional(),
});
const validateMatchInput = (input) => {
    const result = submitMatchSchema.safeParse(input);
    if (!result.success) {
        throw (0, errors_1.validationError)('Invalid match submission', result.error.flatten());
    }
    const { gridRows, gridCols, difficulty, moves, elapsedSeconds } = result.data;
    if ((gridRows && !gridCols) || (!gridRows && gridCols)) {
        throw (0, errors_1.validationError)('Grid rows and columns must both be provided');
    }
    const config = (0, antiCheat_1.getDifficultyConfig)(difficulty);
    if (gridRows && gridRows !== config.rows) {
        throw (0, errors_1.validationError)('Invalid grid rows for difficulty');
    }
    if (gridCols && gridCols !== config.cols) {
        throw (0, errors_1.validationError)('Invalid grid columns for difficulty');
    }
    const minimumMoves = (0, antiCheat_1.getMinimumMoves)(difficulty);
    if (moves < minimumMoves) {
        throw (0, errors_1.validationError)('Moves below minimum possible for this grid');
    }
    if (elapsedSeconds < config.minSeconds) {
        throw (0, errors_1.validationError)('Completion time is unrealistically low for this grid');
    }
    return {
        ...result.data,
        config,
    };
};
exports.validateMatchInput = validateMatchInput;
