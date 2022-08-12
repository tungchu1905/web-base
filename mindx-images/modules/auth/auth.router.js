const express = require('express')
const router = express.Router();
const validateInput = require('../../middlewares/validateInput')
const { loginShema, registerShema } = require('./auth.validation')
const needAuthenticated = require('../../middlewares/needAuthenticated')

const authController = require('./auth.controller')

// router tap hop cac API co diem chung => cung tien to'
// api/auth 
router.post('/register',
    validateInput(registerShema, 'body'),
    authController.register)

router.post('/login',
    validateInput(loginShema, 'body'),
    authController.login)

router.get('/verify',needAuthenticated, authController.verify)

module.exports = router; 