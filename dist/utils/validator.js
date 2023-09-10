"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSchema = exports.validateBlogSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.validateBlogSchema = zod_1.default.object({
    title: zod_1.default.string({ required_error: "title is required" }),
    content: zod_1.default.string({ required_error: "content cannot be  empty" }),
    author: zod_1.default.string({ required_error: "author is required" }),
});
exports.validateUserSchema = zod_1.default.object({
    firstname: zod_1.default.string({ required_error: "firstname is required" }),
    lastname: zod_1.default.string({ required_error: "lastname is required" }),
    email: zod_1.default.string({ required_error: "email is required" }).email({ message: 'mail is invalid' }),
    password: zod_1.default.string({ required_error: "password is required" }).min(6),
});
