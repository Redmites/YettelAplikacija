const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Task = sequelize.define("Task", {
    body: DataTypes.STRING
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
