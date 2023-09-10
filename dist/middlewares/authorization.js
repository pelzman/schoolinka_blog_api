"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const helpers_1 = require("../utils/helpers");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            return res.status(400).send({
                method: req.method,
                status: "error",
                message: "Access Denied, You need to login",
            });
        }
        const pin = authorization.split(" ")[1];
        if (!pin || pin === "") {
            return res.status(400).send({
                method: req.method,
                status: "error",
                message: "Incorrect Access pin",
            });
        }
        const decoded = yield (0, helpers_1.VerifySignature)(pin);
        req.user = decoded;
        console.log(req.user, decoded);
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            method: req.method,
            status: "error",
            message: "internal server error",
        });
    }
});
exports.auth = auth;
