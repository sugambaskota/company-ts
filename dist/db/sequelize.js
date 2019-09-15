"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('company-with-log', 'postgres', 'root', {
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully :)');
})
    .catch((err) => {
    console.log('Unable to connect to the database : ', err);
});
sequelize.sync();
module.exports = sequelize;
