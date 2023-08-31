const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/studentController");
const UserController = require("../controllers/userController");
const { verifyToken } = require("../controllers/middleware");

router.post("/create", verifyToken, StudentController.createStudent);

// User API
router.post("/user", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
