import  express  from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import logger from "morgan"
import config from './config/dbconfig';
import bodyParser from "body-parser";

const app = express()
const {PORT} = config
dotenv.config()
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

export default app;
