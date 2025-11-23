const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/me", authenticate, userController.getMe);

router.put("/:id", authenticate, userController.updateUser);

router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);

module.exports = router;
