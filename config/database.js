const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("yettelapp", "root", "1234", {
    host: "localhost",
    port: 3308,
    dialect: "mysql"
});

module.exports = sequelize;