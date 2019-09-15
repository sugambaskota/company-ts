import Sequelize from 'sequelize';
const sequelize = require('../db/sequelize');

const Log = sequelize.define('log', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    action: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

module.exports = Log;