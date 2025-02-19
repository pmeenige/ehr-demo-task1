// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../controllers/userController');
// const {createTask} = require("../controllers/taskController")

// Ensure the task routes are set up correctly
router.post('/task', taskController.createTask, verifyToken);  // POST route for creating a task
router.get('/task', taskController.getAllTasks, verifyToken);  // GET route to get tasks
router.put('/task/:id',taskController.updateTask, verifyToken);
router.put('/task/:id',taskController.softDeleteTask, verifyToken);
module.exports = router;
