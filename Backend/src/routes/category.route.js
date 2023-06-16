const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "",
  isAuth,
  isPermission("GET_LIST_CATEGORY"),
  categoryController.getAll
);
router.post(
  "",
  isAuth,
  isPermission("ADD_CATEGORY"),
  categoryController.create
);
router.patch(
  "/:id",
  isAuth,
  isPermission("GET_ONE_CATEGORY"),
  categoryController.findOne
);
router.put(
  "/:id",
  isAuth,
  isPermission("UPDATE_CATEGORY"),
  categoryController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DELETE_CATEGORY"),
  categoryController.deleteCategory
);

module.exports = router;