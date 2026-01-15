
const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, deleteAllUsers } = require("../controllers/userController");

const{verifyToken}= require("../middleware/authMiddleware");

const{requireRole}= require("../middleware/roleMiddleware");

//Public routes
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

//protected routes
router.get("/",verifyToken, getUsers);
router.get("/:id",verifyToken, getUserById);
router.put("/:id",verifyToken, updateUser);
router.delete("/:id",verifyToken, deleteUser);

// Admin only
router.delete("/", verifyToken, requireRole("admin"), deleteAllUsers);
router.delete("/:id", verifyToken, requireRole("admin"), deleteUser);

module.exports = router;
