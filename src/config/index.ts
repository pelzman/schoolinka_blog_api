import {Sequelize} from "sequelize"
import dotenv from "dotenv"
import dbConfig from "./dbconfig"
dotenv.config()

export const { GMAIL_USER, GMAIL_PASSWORD, 
    APP_SECRET,} = process.env

export const {PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT} = dbConfig