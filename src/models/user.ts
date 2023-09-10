import { Sequelize,  DataTypes, Model } from "sequelize";
import {db} from "../config"

export interface UserAttributes{
    id? : string
     email?: string
     firstname?: string
     lastname?: string
     password? : string
     confirmPassword?:string, 
     salt? : string
     verified?:boolean
     createdAt? : Date
     UpdatedAt? : Date
     role?: string
}

export class UserInstance extends Model<UserAttributes> {
   
  
}

UserInstance.init({
    id:{
      type:DataTypes.STRING,
      primaryKey: true,
      allowNull:false
    },
    email: {
      type : DataTypes.STRING,
    allowNull : false
    },
    firstname: {
        type : DataTypes.STRING,
      allowNull : false
      },
      lastname: {
        type : DataTypes.STRING,
      allowNull : false
      },
      password: {
        type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
      },
      salt: {
        type : DataTypes.STRING,      
      },
      verified: {
        type : DataTypes.BOOLEAN,      
      },
      createdAt: {
        type : DataTypes.DATE      
      },
      UpdatedAt: {
        type : DataTypes.DATE,      
      }



}, {
    sequelize:db,
    modelName: "Users"
})