const express = require('express'); 
const router = express.Router();

const despartmentController = require('../controllers/department.controller')
const departmentDeviceController = require('../controllers/departmentDevice.controller');

router.get('', despartmentController.getAll)
router.patch('/:id', despartmentController.getOne)
router.post('', despartmentController.create);
router.put('/:id', despartmentController.update);
router.delete('/:id', despartmentController.deleted);

//device in despartment
router.get('/:id/get-device', despartmentController.getAllDevice);
router.post('/add-device', departmentDeviceController.create);

module.exports = router;