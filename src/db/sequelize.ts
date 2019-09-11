import {Sequelize} from 'sequelize';
const sequelize = new Sequelize('company-with-log', 'postgres', 'root', {
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully :)');
    })
    .catch((err: any) => {
        console.log('Unable to connect to the database : ', err);
    });

sequelize.sync();

module.exports = sequelize;