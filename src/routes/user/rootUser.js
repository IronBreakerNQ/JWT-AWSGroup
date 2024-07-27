const express = require('express');
const router = express.Router()

const authenticateTokenRoot  = require('../../app/middlewares/authenticateTokenRoot');
const UserRootControolers = require('../../app/controllers/UserRootControolers');

router.post('/creater_Root_User',UserRootControolers.create);
router.post('/login_root',UserRootControolers.Login);

router.get('/all_root',authenticateTokenRoot,UserRootControolers.findAllRoot);

module.exports = router;