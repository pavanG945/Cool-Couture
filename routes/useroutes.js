const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/usercontroller');

// POST /api/users/login
router.post('/login', loginUser);

// POST /api/users/register
router.post('/register', registerUser);

module.exports = router;
