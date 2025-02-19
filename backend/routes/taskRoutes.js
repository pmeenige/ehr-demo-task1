// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
// const {createTask} = require("../controllers/taskController")

// Ensure the task routes are set up correctly
router.post('/task', taskController.createTask);  // POST route for creating a task
router.get('/task', taskController.getAllTasks);  // GET route to get tasks
router.put('/task/:id',taskController.updateTask);
router.put('/task/:id',taskController.softDeleteTask);
module.exports = router;
