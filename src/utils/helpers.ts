import bcrypt from "bcrypt"
import { APP_SECRET } from "../config"
import  jwt,{JwtPayload} from "jsonwebtoken"



export const GenerateSalt = async()=>{
   const saltRound = 10
   return  await bcrypt.genSalt(saltRound)
   
}

export const HashPassword = async(password:string, salt:string)=>{
  return await bcrypt.hash(password, salt)  
}
//signing the id dynamically
export const GenerateSignature = async(payload:any)=>{
   
   return jwt.sign({payload},`${APP_SECRET}` ,{expiresIn : "10h"}) 
}

//verifying the signature
export const VerifySignature = async(signature:string)=>{
   
    return jwt.verify(signature, APP_SECRET! ) as JwtPayload
 }

 //checking password

 export const checkingPassword = async(incomingPassword:string, storedPassword:string)=>{
   
    return bcrypt.compare(incomingPassword,storedPassword ) 
 }

