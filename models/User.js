const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM("basic", "admin"),
        defaultValue: "basic"
    }
});

module.exports = User;
