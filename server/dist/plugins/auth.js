"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuth = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const env_1 = require("../config/env");
const registerAuth = async (app) => {
    await app.register(jwt_1.default, {
        secret: env_1.env.JWT_SECRET,
        sign: {
            expiresIn: '7d',
        },
    });
};
exports.registerAuth = registerAuth;
