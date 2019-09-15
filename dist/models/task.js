"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../db/sequelize');
const Task = sequelize.define('task', {
    id: {
        primaryKey: true,
        type: sequelize_1.default.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV1
    },
    description: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    completed: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    timestamps: true,
    paranoid: true
});
module.exports = Task;
