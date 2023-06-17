const express = require('express');
const router = express.Router();

const deviceController = require('../controllers/device.controller');
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.post("/get-list", isAuth, isPermission("GET_LIST_DEVICE"), deviceController.getAll);
router.patch(
  "/:id",
  isAuth,
  isPermission("GET_ONE_DEVICE"),
  deviceController.getOne
);
router.post(
  "",
  isAuth,
  isPermission("ADD_DEVICE"),
  deviceController.create
);
router.put(
  "/:id",
  isAuth,
  isPermission("UPDATE_DEVICE"),
  deviceController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DELETE_DEVICE"),
  deviceController.deleted
);

module.exports = router;