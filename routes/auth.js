const express = require('express');
const authController= require('../controllers/auth')

const router = express.Router();// router handler needed dont forget prince
router.post('/register', authController.register)




module.exports = router;