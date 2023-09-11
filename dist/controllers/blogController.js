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
exports.deleteAllPosts = exports.deleteSinglePost = exports.updatePost = exports.addComments = exports.createPost = exports.getSinglePost = exports.getAllPost = void 0;
const blog_1 = require("../models/blog");
const validator_1 = require("../utils/validator");
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
//get all posts
const getAllPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Search Functionality
        const { title, author } = req.query;
        const searchCriteria = {};
        if (title) {
            searchCriteria.title = { [sequelize_1.Op.like]: `%${title}%` };
        }
        if (author) {
            searchCriteria.author = { [sequelize_1.Op.like]: `%${author}%` };
        }
        //pagination functionality
        let page = 1;
        if (req.query.page) {
            page = parseInt(req.query.page);
            if (Number.isNaN(page)) {
                return res.status(400).json({
                    method: req.method,
                    status: "error",
                    message: "Invalid page number",
                });
            }
        }
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const Posts = yield blog_1.blogInstance.findAll({ where: searchCriteria });
        const totalPages = Math.ceil(Posts.length / pageSize);
        if (page > totalPages) {
            page = totalPages;
        }
        const allPosts = Posts.slice(offset, page * pageSize);
        return res.status(200).json({
            method: req.method,
            status: "successful",
            message: "posts fetch successfully",
            data: allPosts,
            currentPage: page,
            totalPages,
        });
        //search functionality
    }
    catch (error) {
        console.error("error getting data from getBlogs :", error);
        return res.status(500).json({
            method: req.method,
            status: "error",
            message: "Internal Server Error",
        });
    }
});
exports.getAllPost = getAllPost;
const getSinglePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield blog_1.blogInstance.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(400).send({
                message: `user with id ${postId} does not exsist `,
            });
        }
        return res.status(200).send({
            message: "post fetched successfully",
            status: 200,
            data: post,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Intenal server error",
        });
    }
});
exports.getSinglePost = getSinglePost;
//creating posts
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, content } = req.body;
        //console.log(JSON.stringify(req.body));
        // uploade to cloudinary   
        const error = validator_1.validateBlogSchema.safeParse(req.body);
        if (error.success === false) {
            res.status(400).send({
                error: error.error.issues[0].message,
            });
            return;
        }
        const existingPost = (yield blog_1.blogInstance.findOne({
            where: { title: title },
        }));
        if (existingPost) {
            return res.send({
                message: `post already  exists`,
            });
        }
        let postId = (0, uuid_1.v4)();
        const newPost = yield blog_1.blogInstance.create({
            id: postId,
            title,
            author,
            content
        });
        res.status(201).json({
            method: req.method,
            status: "success",
            message: "Post successfully Created",
            data: newPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            method: req.method,
            status: "error",
            message: `Internal Server Error.`,
        });
    }
});
exports.createPost = createPost;
//create posts
const addComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comments } = req.body;
        const Comment = {
            id: (0, uuid_1.v4)(),
            content: comments,
            author: "Dada Adeyemo",
        };
    }
    catch (error) {
        console.error("error getting data from getBlogs :", error);
        return res.status(500).json({
            method: req.method,
            status: "error",
            message: "internal server error",
        });
    }
});
exports.addComments = addComments;
//update posts
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const { title, author, content } = req.body;
        const existPost = yield blog_1.blogInstance.findOne({ where: { id } });
        if (!existPost) {
            return res.status(400).json({
                method: req.method,
                status: "error",
                message: `Post with ID ${id} not found.`,
            });
        }
        yield existPost.update({
            title, author, content
        });
        return res.status(200).send({
            method: req.method,
            status: "success",
            message: "post updated successfully",
            data: existPost,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            method: req.method,
            status: "error",
            message: "Internal Server Error",
        });
    }
});
exports.updatePost = updatePost;
//delete single post
const deleteSinglePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const deleteSingle = yield blog_1.blogInstance.destroy({ where: { id } });
        if (!deleteSingle) {
            return res.status(400).json({
                method: req.method,
                status: "error",
                message: ` Posts with id ${id} not found`,
            });
        }
        return res.status(200).json({
            method: req.method,
            status: "success",
            message: ` Posts with id ${id} deleted succesfully`,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteSinglePost = deleteSinglePost;
//delete All Posts
const deleteAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAll = yield blog_1.blogInstance.destroy({ truncate: true });
        return res.status(200).json({
            method: req.method,
            status: "success",
            message: `All Posts deleted succesfully`,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAllPosts = deleteAllPosts;
