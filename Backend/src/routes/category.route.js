const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

router.get('', categoryController.getAll);
router.post('', categoryController.create);
router.patch('/:id', categoryController.findOne);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;