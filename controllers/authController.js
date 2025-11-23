const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const exists = await User.findOne({ where: { email } }) ||
            await User.findOne({ where: { username } });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashed,
            role: "basic",
        });

        res.json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            "SECRET_KEY",
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
