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
exports.userLogin = exports.registerUser = exports.getSingleUser = exports.getAll = void 0;
const user_1 = require("../models/user");
const validator_1 = require("../utils/validator");
const uuid_1 = require("uuid");
const helpers_1 = require("../utils/helpers");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserInstance.findAll({});
        return res.status(200).json({
            message: "user fetch successfully",
            user,
        });
    }
    catch (error) { }
});
exports.getAll = getAll;
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_1.UserInstance.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(400).send({
                message: `user with id ${userId} does not exsist `,
            });
        }
        return res.status(200).send({
            message: "user fetched successfully",
            status: 200,
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Intenal server error",
        });
    }
});
exports.getSingleUser = getSingleUser;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstname, lastname, password, confirmPassword, salt, role, verified, createdAt, UpdatedAt, } = req.body;
        const userId = (0, uuid_1.v4)();
        //checking password
        if (password !== confirmPassword) {
            return res.status(400).send({
                method: req.method,
                message: "password not matched",
            });
        }
        const error = validator_1.validateUserSchema.safeParse(req.body);
        if (error.success === false) {
            res.status(400).send({
                error: error.error.issues[0].message,
            });
            return;
        }
        const userExist = yield user_1.UserInstance.findOne({ where: { email: email } });
        if (userExist) {
            return res.status(400).send({
                method: req.method,
                message: "user already exist",
            });
        }
        //hashhing password
        const userSalt = yield (0, helpers_1.GenerateSalt)();
        const hashPassword = yield (0, helpers_1.HashPassword)(password, userSalt);
        //create user
        const newUser = (yield user_1.UserInstance.create({
            id: userId,
            email,
            firstname,
            lastname,
            password: hashPassword,
            confirmPassword: hashPassword,
            salt: userSalt,
            role: "user",
            verified: false,
            createdAt,
            UpdatedAt,
        }));
        //generate token
        return res.status(200).send({
            method: req.method,
            status: "success",
            message: "user registered successfully",
            data: newUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            method: req.method,
            status: "error",
            message: "internal server error",
        });
    }
});
exports.registerUser = registerUser;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = (yield user_1.UserInstance.findOne({
            where: { email: email },
        }));
        console.log(user);
        if (!user) {
            return res.status(400).send({
                method: req.method,
                status: "error",
                message: "kindly register with us",
            });
        }
        if (user.password) {
            const validate = yield (0, helpers_1.checkingPassword)(password, user.password);
            if (!validate) {
                return res.status(400).send({
                    method: req.method,
                    status: "error",
                    message: "Incorrect password",
                });
            }
            //generate token
            const token = yield (0, helpers_1.GenerateSignature)({ id: user.id });
            res.cookie("token", token);
            return res.status(200).send({
                method: req.method,
                status: "success",
                message: "Login successfully",
                data: user,
                token
            });
        }
    }
    catch (error) {
        return res.status(400).send({
            method: req.method,
            status: "error",
            message: "internal server error",
        });
    }
});
exports.userLogin = userLogin;
