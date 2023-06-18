const UserService = require("../services/user.service");
exports.isPermission = (permission) => async (req, res, next) => {


	const checkedAccess = await UserService.checkAccessPermission(req.user.id, permission);
	if (checkedAccess) return next();

	return res.status(403).send({
		message: "You not access Permission"
	})
};
