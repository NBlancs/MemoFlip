"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const errors_1 = require("./errors");
const requireUser = (user) => {
    if (!user) {
        throw (0, errors_1.authError)();
    }
    return user;
};
exports.requireUser = requireUser;
