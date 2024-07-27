const express = require('express');
const router = express.Router()

const authenticateTokenRoot  = require('../../app/middlewares/authenticateTokenRoot');
const authenticateTokenAdmin  = require('../../app/middlewares/authenticateTokenAdmin');
const authenticateRfTokenAdmin  = require('../../app/middlewares/authenticateRfTokenAdmin');
const UserAdminControlers= require('../../app/controllers/UserAdminControlers');

router.post('/create_admin_user',authenticateTokenRoot,UserAdminControlers.create);
router.post('/login',authenticateRfTokenAdmin,UserAdminControlers.Login);
router.get('/test',authenticateTokenAdmin,UserAdminControlers.test);
module.exports = router;