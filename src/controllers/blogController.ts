import express, { Request, Response, NextFunction } from "express";
import { blogInstance,  BlogPostAttribute } from "../models/blog";
import { validateBlogSchema } from "../utils/validator";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import { Op } from "sequelize";

//get all posts



export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Search Functionality
    const { title, author } = req.query;
    const searchCriteria: any = {};
    if (title) {
      searchCriteria.title = { [Op.like]: `%${title}%` };
    }

    if (author) {
      searchCriteria.author = { [Op.like]: `%${author}%` };
    }

    //pagination functionality
    let page = 1;
    if (req.query.page) {
      page = parseInt(req.query.page as string);
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

    const Posts = await blogInstance.findAll({ where: searchCriteria });
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
  } catch (error) {
    console.error("error getting data from getBlogs :", error);
    return res.status(500).json({
      method: req.method,
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getSinglePost = async(
  req: Request,
  res: Response,
  next: NextFunction

)=>{
  try {
    const  postId = req.params.id
  
    const post = await blogInstance.findOne({where:{ id: postId}} ) ;
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
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Intenal server error",
    });
  }
}
//creating posts

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, content} = req.body;

    //console.log(JSON.stringify(req.body));
    // uploade to cloudinary   
 

    const error = validateBlogSchema.safeParse(req.body);
    if (error.success === false) {
      res.status(400).send({
        error: error.error.issues[0].message,
      });
      return;
    }

    
    const existingPost = (await blogInstance.findOne({
      where: { title:title },
    })) as unknown as  BlogPostAttribute;

    if (existingPost) {
      return res.send({
        message: `post already  exists`,
      });
    }
 
     let postId = v4()
    const newPost = await blogInstance.create({
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
  } catch (error) {
    return res.status(500).json({
      method: req.method,
      status: "error",
      message: `Internal Server Error.`,
    });
  }
};

//create posts
export const addComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comments } = req.body;
    const Comment = {
      id: v4(),
      content: comments,
      author: "Dada Adeyemo",
    };
  } catch (error) {
    console.error("error getting data from getBlogs :", error);
    return res.status(500).json({
      method: req.method,
      status: "error",
      message: "internal server error",
    });
  }
};
//update posts
export const updatePost = async (
  req:Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const { title, author, content} = req.body;
    const existPost = await blogInstance.findOne({where:{id}});

    if (!existPost) {
      return res.status(400).json({
        method: req.method,
        status: "error",
        message: `Post with ID ${id} not found.`,
      });
    }   

    await existPost.update(  {
        title, author, content
    });

    return res.status(200).send({
      method: req.method,
      status: "success",
      message: "post updated successfully",
      data: existPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      method: req.method,
      status: "error",
      message: "Internal Server Error",
    });
  }
};
//delete single post
export const deleteSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const deleteSingle = await blogInstance.destroy({ where: { id } });
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
  } catch (error) {
    console.log(error);
  }
};

//delete All Posts
export const deleteAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteAll = await blogInstance.destroy({ truncate: true });
    return res.status(200).json({
      method: req.method,
      status: "success",
      message: `All Posts deleted succesfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
