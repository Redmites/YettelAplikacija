const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post("/", authenticate, authorize(["basic"]), taskController.createTask);

router.get("/", authenticate, taskController.getTasks);

router.put("/:id", authenticate, taskController.updateTask);

module.exports = router;
