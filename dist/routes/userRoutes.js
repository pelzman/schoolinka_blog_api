"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/all', userController_1.getAll);
router.get('/single/:id', userController_1.getSingleUser);
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.userLogin);
exports.default = router;
