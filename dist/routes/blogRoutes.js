"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const authorization_1 = require("../middlewares/authorization");
// import { upload } from "../middlewares/uploads";
const router = (0, express_1.Router)();
router.get("/posts", blogController_1.getAllPost);
router.post('/add', authorization_1.auth, blogController_1.createPost);
router.put('/update', authorization_1.auth, blogController_1.updatePost);
router.delete('/delete', authorization_1.auth, blogController_1.deleteSinglePost);
router.delete('/deleteAll', authorization_1.auth, blogController_1.deleteAllPosts);
exports.default = router;