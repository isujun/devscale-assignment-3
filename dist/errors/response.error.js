"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.ResponseError = ResponseError;
class InternalServerError extends Error {
}
exports.InternalServerError = InternalServerError;
