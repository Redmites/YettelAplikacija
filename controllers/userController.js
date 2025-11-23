const  User  = require("../models/User");
const { Op } = require("sequelize");

exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (req.user.role !== "admin" && req.user.id !== id) {
            return res.status(403).json({ message: "You can update only your own profile" });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (req.body.email) {
            const emailExists = await User.findOne({ where: { email: req.body.email, id: { [Op.ne]: id } } });
            if (emailExists) return res.status(400).json({ message: "Email already in use" });
        }

        if (req.body.username) {
            const usernameExists = await User.findOne({ where: { username: req.body.username, id: { [Op.ne]: id } } });
            if (usernameExists) return res.status(400).json({ message: "Username already in use" });
        }

        await user.update(req.body);

        res.json({ message: "User updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
