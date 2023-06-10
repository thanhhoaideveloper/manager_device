const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const AuthMiddleWare = require('../middlewares/auth.middleware');

router.get('', AuthMiddleWare.isAuth ,UserController.getAll);

module.exports = router;
