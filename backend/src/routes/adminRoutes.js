const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getAllTasks,
  deleteUser,
  deleteTask,
  getAdminStats,
} = require("../controllers/adminController");

// Dashboard Statistics
router.get(
  "/stats",
  protect,
  adminOnly,
  getAdminStats
);

// Users
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

// Tasks
router.get(
  "/tasks",
  protect,
  adminOnly,
  getAllTasks
);

router.delete(
  "/tasks/:id",
  protect,
  adminOnly,
  deleteTask
);

module.exports = router;