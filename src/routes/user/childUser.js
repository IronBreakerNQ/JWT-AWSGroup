const express = require('express');
const router = express.Router()

const authenticateTokenAdmin  = require('../../app/middlewares/authenticateTokenAdmin');
const UserChildControolers = require('../../app/controllers/UserChildControolers');

router.post('/creater_child_user',authenticateTokenAdmin,UserChildControolers.create);
router.post('/login',UserChildControolers.Login);
module.exports = router;