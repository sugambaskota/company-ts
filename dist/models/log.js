"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../db/sequelize');
const Log = sequelize.define('log', {
    id: {
        primaryKey: true,
        type: sequelize_1.default.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV1
    },
    userId: {
        type: sequelize_1.default.UUID,
        allowNull: false
    },
    action: {
        type: sequelize_1.default.STRING
    },
    time: {
        type: sequelize_1.default.DATE
    }
}, {
    timestamps: false
});
module.exports = Log;
//# sourceMappingURL=log.js.map