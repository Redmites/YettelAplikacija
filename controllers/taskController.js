const  Task  = require("../models/Task");
const { Op } = require("sequelize");

exports.createTask = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            return res.status(403).json({ message: "Admins cannot create tasks" });
        }

        const { body } = req.body;
        const task = await Task.create({ body, UserId: req.user.id });

        res.json({ message: "Task created", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort === "asc" ? "ASC" : "DESC";
        const offset = (page - 1) * limit;

        const where = req.user.role === "admin" ? {} : { UserId: req.user.id };

        const tasks = await Task.findAll({
            where,
            limit,
            offset,
            order: [["createdAt", sort]],
        });

        res.json({ page, limit, tasks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await Task.findByPk(id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.user.role !== "admin" && task.UserId !== req.user.id) {
            return res.status(403).json({ message: "You can only update your own tasks" });
        }

        await task.update(req.body);
        res.json({ message: "Task updated", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
