import dotenv from "dotenv";

dotenv.config();

const { PROD_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } =
    process.env;

export default {
    PORT: PROD_PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
};

console.log("running in production mode");