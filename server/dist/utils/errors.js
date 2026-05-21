"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = exports.authError = void 0;
const mercurius_1 = require("mercurius");
const authError = (message = 'Authentication required') => new mercurius_1.ErrorWithProps(message, { code: 'UNAUTHENTICATED' });
exports.authError = authError;
const validationError = (message, details) => new mercurius_1.ErrorWithProps(message, { code: 'BAD_USER_INPUT', details });
exports.validationError = validationError;
