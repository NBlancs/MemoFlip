"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolvers = void 0;
const authService_1 = require("../services/authService");
const authValidator_1 = require("../validators/authValidator");
exports.authResolvers = {
    Mutation: {
        register: async (_, { input }, context) => {
            const data = (0, authValidator_1.parseRegisterInput)(input);
            const player = await (0, authService_1.registerPlayer)(context.prisma, data);
            const token = context.reply.server.jwt.sign({
                sub: player.id,
                email: player.email,
            });
            return { token, player };
        },
        login: async (_, { input }, context) => {
            const data = (0, authValidator_1.parseLoginInput)(input);
            const player = await (0, authService_1.loginPlayer)(context.prisma, data);
            const token = context.reply.server.jwt.sign({
                sub: player.id,
                email: player.email,
            });
            return { token, player };
        },
    },
};
