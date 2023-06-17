const { Permission } = require("../models");

exports.findOne = async (fields) => {
	return await Permission.findOne({
		where : fields
	})
}

exports.findAll = async () => {
	return Permission.findAll();
}