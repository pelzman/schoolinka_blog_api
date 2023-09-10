import express, { Response, Request, NextFunction } from "express";
import { UserInstance, UserAttributes } from "../models/user";
import { validateUserSchema } from "../utils/validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import {
  GenerateSalt,
  GenerateSignature,
  HashPassword,
  checkingPassword,
} from "../utils/helpers";


export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserInstance.findAll({});

    return res.status(200).json({
      message: "user fetch successfully",
      user,
    });
  } catch (error) {}
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   const  userId = req.params.id
  
    const user = await UserInstance.findOne({where:{ id: userId}} ) ;
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Intenal server error",
    });
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      firstname,
      lastname,
      password,
      confirmPassword,
      salt,
      role,
      verified,
      createdAt,
      UpdatedAt,
    } = req.body;
    const userId = v4();
    //checking password
    if (password !== confirmPassword) {
      return res.status(400).send({
        method: req.method,
        message: "password not matched",
      });
    }
    const error = validateUserSchema.safeParse(req.body);
    if (error.success === false) {
      res.status(400).send({
        error: error.error.issues[0].message,
      });
      return;
    }
    const userExist = await UserInstance.findOne({ where: { email: email } });
    if (userExist) {
      return res.status(400).send({
        method: req.method,
        message: "user already exist",
      });
    }
    //hashhing password
    const userSalt = await GenerateSalt();
    const hashPassword = await HashPassword(password, userSalt);

    //create user
    const newUser = (await UserInstance.create({
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
    })) as unknown as UserAttributes;

    //generate token
   
    return res.status(200).send({
      method: req.method,
      status: "success",
      message: "user registered successfully",
  
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      method: req.method,
      status: "error",
      message: "internal server error",
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;

    console.log(user);
    if (!user) {
      return res.status(400).send({
        method: req.method,
        status: "error",
        message: "kindly register with us",
      });
    }
    if (user.password) {
      const validate = await checkingPassword(password, user.password);
      if (!validate) {
        return res.status(400).send({
          method: req.method,
          status: "error",
          message: "Incorrect password",
        });
      }
       //generate token
       const token = await GenerateSignature({id:user.id}) 
       res.cookie("token", token)
       
       return res.status(200).send({
        method: req.method,
        status: "success",
        message: "Login successfully",
        data: user,
        token
      
        
      });
    }
 
  } catch (error) {
    return res.status(400).send({
      method: req.method,
      status: "error",
      message: "internal server error",
    });
  }
};
