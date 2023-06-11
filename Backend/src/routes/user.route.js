const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const AuthMiddleWare = require('../middlewares/auth.middleware');

router.get('' ,UserController.getAll);
router.post('', UserController.create);
router.patch('/:id', UserController.getOne);
router.put('/:id', UserController.getOne);
router.delete('/:id', UserController.deleted);

module.exports = router;
