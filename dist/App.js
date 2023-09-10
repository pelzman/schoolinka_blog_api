"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
const morgan_1 = __importDefault(require("morgan"));
const dbconfig_1 = __importDefault(require("./config/dbconfig"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const { PORT } = dbconfig_1.default;
dotenv_1.default.config();
//to parse json body
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
config_1.db.sync({}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});
app.use("/users", userRoutes_1.default);
app.use("/blogs", blogRoutes_1.default);
const BUILDPORT = PORT;
app.listen(BUILDPORT, () => {
    console.log(`server running on port ${BUILDPORT}`);
});
exports.default = app;
