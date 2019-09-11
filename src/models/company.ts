import Sequelize from 'sequelize';
const sequelize = require('../db/sequelize');

const Company = sequelize.define('company', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Company;