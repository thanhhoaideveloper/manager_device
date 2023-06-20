const requestDevice = require("../services/requestDevice.service");
const statusCons = require("../utils/requestConstant.utils").status;
const deviceDepartment = require("../services/departmentDevice.service");

async function getAll(req, res, next) {
	try {
		const data = await requestDevice.findAll();
    return res.status(200).send(data);
	} catch (error) {
		return res.status(500).send({ message: "find all data failed" });
	}

}
async function getOne(req, res, next) {
	try {
		const { id } = req.params;
    const data = await requestDevice.findOne(id);
    return res.status(200).send(data);
	} catch (error) {
		return res.status(500).send({ message: "find data failed" });
	}

}

async function create(req, res, next) {
	try {
		const { title, user_id, device_id, reason, quantity, department_from, department_to } = req.body;
		const note = req.body.note || '';
    const requestCreated= await requestDevice.create({
			title,
			user_id,
			device_id,
			reason,
			note,
			quantity,
			department_from,
			department_to,
			status: statusCons.PENDING
    });
    if (!requestCreated) {
			res.status(500).send({
				message: "create new request fail"
      });
    }
    res.status(201).send(requestCreated);
	} catch (e) {
		return res.status(500).send({ message: "update status failed" });
	}
}

async function updateStatus(req, res, next) {
	try {
	const { id } = req.params;
	const { status } = req.body;
	const checkRequest = requestDevice.findOne({ id });
	if (!checkRequest) return res.status(500).send({ message: "Not found request" });
	const result = null;
	if (status == statusCons.APPROVE) {
		result = await requestDevice.updated({ status: statusCons.APPROVE }, id);
		await deviceDepartment.updateQuantity(
      result.quantity,
      result.device_id,
      result.department_from
		);
		const checkHasDeviceAndDepartmentTo = await deviceDepartment.getOne({
			device_id: result.device_id,
			department_id: result.department_to
		});
		if (checkHasDeviceAndDepartmentTo) {
			await deviceDepartment.updateQuantity(
        -result.quantity,
        result.device_id,
        result.department_to
      );
		}
		else {
			await deviceDepartment.addDevice({
        device_id: result.device_id,
        quantity: result.quantity,
        department_id: result.department_to,
      });
		}
	}
	else if (status == statusCons.DONE) {
		result = await requestDevice.updated({ status: statusCons.DONE }, id);
	}
		return res.status(200).send(result);
	}
	catch (err) {
		return res.status(500).send({message: "update status failed"})
	}
}

async function remove(req, res, next) {
	try {
		const { id } = req.params;
		const result = await requestDevice.deleted(id);
		return res.status(200).send(result);
	} catch (error) {
		return res.status(500).send({ message: "delete failed" });
	}
}

module.exports = {
	getAll,
	getOne,
	create,
	updateStatus,
	remove
}