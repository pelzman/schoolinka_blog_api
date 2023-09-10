"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_NAME = exports.DB_HOST = exports.PORT = exports.APP_SECRET = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const dbconfig_1 = __importDefault(require("./dbconfig"));
dotenv_1.default.config();
exports.APP_SECRET = process.env.APP_SECRET;
exports.PORT = dbconfig_1.default.PORT, exports.DB_HOST = dbconfig_1.default.DB_HOST, exports.DB_NAME = dbconfig_1.default.DB_NAME, exports.DB_USERNAME = dbconfig_1.default.DB_USERNAME, exports.DB_PASSWORD = dbconfig_1.default.DB_PASSWORD, exports.DB_PORT = dbconfig_1.default.DB_PORT;
//const DB_PORT = process.env.DB_PORT as unknown as number
exports.db = new sequelize_1.Sequelize(exports.DB_NAME, //name of database
exports.DB_USERNAME, //name of username
exports.DB_PASSWORD, //db password
{
    host: exports.DB_HOST,
    port: exports.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true,
    },
});
