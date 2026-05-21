"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPlayer = exports.registerPlayer = void 0;
const errors_1 = require("../utils/errors");
const password_1 = require("../utils/password");
const registerPlayer = async (prisma, input) => {
    const email = input.email.toLowerCase();
    const existing = await prisma.player.findUnique({
        where: { email },
        select: { id: true },
    });
    if (existing) {
        throw (0, errors_1.validationError)('Email is already registered');
    }
    const passwordHash = await (0, password_1.hashPassword)(input.password);
    return prisma.player.create({
        data: {
            email,
            displayName: input.displayName,
            passwordHash,
        },
    });
};
exports.registerPlayer = registerPlayer;
const loginPlayer = async (prisma, input) => {
    const player = await prisma.player.findUnique({
        where: { email: input.email.toLowerCase() },
    });
    if (!player) {
        throw (0, errors_1.validationError)('Invalid email or password');
    }
    const isValid = await (0, password_1.verifyPassword)(input.password, player.passwordHash);
    if (!isValid) {
        throw (0, errors_1.validationError)('Invalid email or password');
    }
    return player;
};
exports.loginPlayer = loginPlayer;
