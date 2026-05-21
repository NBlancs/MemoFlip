"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLoginInput = exports.parseRegisterInput = void 0;
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(72),
    displayName: zod_1.z.string().min(2).max(32),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(72),
});
const parseRegisterInput = (input) => {
    const result = registerSchema.safeParse(input);
    if (!result.success) {
        throw (0, errors_1.validationError)('Invalid registration input', result.error.flatten());
    }
    return result.data;
};
exports.parseRegisterInput = parseRegisterInput;
const parseLoginInput = (input) => {
    const result = loginSchema.safeParse(input);
    if (!result.success) {
        throw (0, errors_1.validationError)('Invalid login input', result.error.flatten());
    }
    return result.data;
};
exports.parseLoginInput = parseLoginInput;
