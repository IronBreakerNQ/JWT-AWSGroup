const express = require('express');
const router = express.Router()

const authenticateTokenAdmin  = require('../../app/middlewares/authenticateTokenAdmin');
const UserGroupControlers = require('../../app/controllers/UserGroupControlers');

router.post('/create',authenticateTokenAdmin,UserGroupControlers.create);

module.exports = router;