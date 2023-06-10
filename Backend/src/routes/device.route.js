const express = require('express'); 
const router = express.Router();

const deviceController = require('../controllers/device.controller')

router.get('', deviceController.getAll)
router.patch('/:id', deviceController.getOne)
router.post('', deviceController.create);
router.put('/:id', deviceController.update);
router.delete('/:id', deviceController.deleted);

module.exports = router;