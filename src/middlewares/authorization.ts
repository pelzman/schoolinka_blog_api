import express,{Request, Response, NextFunction} from "express"
import jwt,{JwtPayload} from "jsonwebtoken"
import { APP_SECRET } from "../config"
import { VerifySignature } from "../utils/helpers"

export const auth = async(req:JwtPayload, res:Response, next:NextFunction
    )=>{
try {
   const authorization = req.headers.authorization 
   if(authorization === undefined){
    return res.status(400).send({
       
            method:req.method,
            status:"error",
            message:"Access Denied, You need to login",        
    
    })

   }
   const pin = authorization.split(" ")[1]
   if(!pin || pin ===""){
    return res.status(400).send({
       
        method:req.method,
        status:"error",
        message:"Incorrect Access pin",        

})
   }

   const decoded = await VerifySignature(pin)   
   req.user = decoded
   console.log(req.user, decoded)
   return next()
} catch (error) {
    console.log(error)
    return res.status(500).send({
      
        method:req.method,
        status:"error",
        message:"internal server error",        

}) 
}
}