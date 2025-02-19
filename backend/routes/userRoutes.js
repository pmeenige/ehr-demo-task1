// routes/userRoutes.js

const express = require('express');
const { addUser,loginUser, getUser } = require('../controllers/userController');


const router = express.Router();

// POST route for adding a user
router.post('/add', addUser);
router.post('/login',loginUser);

// router.post('/login',loginUser);

// router.get('/user/:userId',getUser);

module.exports = router;
