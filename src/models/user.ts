const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const User = sequelize.define('user', {
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
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [5, 20]
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
},
    {
        timestamps: true,
        paranoid: true
    });

User.findByCredentials = async (email, password, companyId) => {
    const user = await User.findOne({
        where: {
            email,
            companyId
        }
    });
    if (!user) {
        throw Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Unable to login!');
    }
    return user;
}

User.prototype.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id }, 'helloworld', { expiresIn: '1h' });
    return token;
}

User.beforeCreate(async (user, options) => {
    hashedPw = await bcrypt.hash(user.password, 8);
    user.password = hashedPw;
});

User.beforeUpdate((user, options) => {
    const password = user.password;
    if (user.changed('password')) {
        return bcrypt.hash(password, 8).then((hashedPw) => {
            user.password = hashedPw;
        });
    } else {
        return null;
    }
});

module.exports = User;
