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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingPassword = exports.VerifySignature = exports.GenerateSignature = exports.HashPassword = exports.GenerateSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    const saltRound = 10;
    return yield bcrypt_1.default.genSalt(saltRound);
});
exports.GenerateSalt = GenerateSalt;
const HashPassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.HashPassword = HashPassword;
//signing the id dynamically
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ payload }, `${config_1.APP_SECRET}`, { expiresIn: "10h" });
});
exports.GenerateSignature = GenerateSignature;
//verifying the signature
const VerifySignature = (signature) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(signature, config_1.APP_SECRET);
});
exports.VerifySignature = VerifySignature;
//checking password
const checkingPassword = (incomingPassword, storedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(incomingPassword, storedPassword);
});
exports.checkingPassword = checkingPassword;
