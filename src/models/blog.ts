
import {Sequelize, DataTypes, Model } from "sequelize"

import {db} from "../config"


 export interface BlogPostAttribute {
    id?: string;  
    public_id?:string          
    title?: string;         
    content?: string;       
    author?: string;       
    createdAt?: Date;       
    updatedAt?: Date;          
  
  }



  export   class blogInstance  extends Model <BlogPostAttribute>{}

  blogInstance.init({
    id:{
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type: DataTypes.STRING,      
        allowNull:false   
    },
    content:{
        type: DataTypes.STRING,       
        allowNull:false   
    },
    author:{
        type: DataTypes.STRING,      
        allowNull:false   
    },

    

  }, {
   sequelize : db,
   modelName : "Posts"
  })


