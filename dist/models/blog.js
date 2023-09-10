"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInstance = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class blogInstance extends sequelize_1.Model {
}
exports.blogInstance = blogInstance;
blogInstance.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: config_1.db,
    modelName: "Posts"
});
