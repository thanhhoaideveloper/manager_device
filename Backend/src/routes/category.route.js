const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  categoryController.getAll
);
router.post(
  "",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  categoryController.create
);
router.patch(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  categoryController.findOne
);
router.put(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  categoryController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  categoryController.deleteCategory
);

module.exports = router;