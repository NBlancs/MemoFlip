"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinimumMoves = exports.getDifficultyConfig = void 0;
const DIFFICULTY_CONFIG = {
    EASY: { rows: 4, cols: 4, pairs: 8, minSeconds: 10 },
    NORMAL: { rows: 6, cols: 6, pairs: 18, minSeconds: 20 },
    HARD: { rows: 8, cols: 8, pairs: 32, minSeconds: 30 },
};
const getDifficultyConfig = (difficulty) => DIFFICULTY_CONFIG[difficulty];
exports.getDifficultyConfig = getDifficultyConfig;
const getMinimumMoves = (difficulty) => DIFFICULTY_CONFIG[difficulty].pairs;
exports.getMinimumMoves = getMinimumMoves;
