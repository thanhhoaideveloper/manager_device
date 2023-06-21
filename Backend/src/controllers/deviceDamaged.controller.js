const DeviceDamagedService = require("../services/deviceDamaged.service");
const utils = require("../utils/deviceConstant.util");
const DeviceDepartmentService = require("../services/departmentDevice.service");
const DepartmentService = require("../services/department.service");

async function getAll(req, res, next) {
	try {
		const result = await DeviceDamagedService.findAll();
		if (result.length == 0) {
			return res
        .status(500)
        .send({ message: "find all device damaged failed" });
		}
		return res.status(200).send(result);
  } catch (error) {
		return res
			.status(500).send({ message: "find all device damaged failed" });
  }
}

async function getOne(req, res, next) {
	try {
		const { id } = req.params;
		const deviceDamaged = await DeviceDamagedService.findOne({ id });
		if (!deviceDamaged) {
			return res
				.status(500).send({ message: "create device managed failed" });
		}

		return res.status(200).send(deviceDamaged);
  } catch (error) {
    return res.status(500).send({ message: "find device damaged failed" });
  }
}
async function create(req, res, next) {
	try {
		const { device_id, quantity, department_id } = req.body;
		const check_date = new Date();
		const created = await DeviceDamagedService.create({
			device_id,
			quantity,
			status: utils.status.DAMAGED,
			check_date,
		})
		if (!created) {
			return res
				.status(500).send({ message: created });
		}
		//update number device in device department, department_id: id của phòng chứa thiết bị hỏng.
		await DeviceDepartmentService.updateQuantity(quantity, device_id, department_id, utils.type.DECREASE);
		await DepartmentService.updateDeviceCount(
      department_id,
      quantity,
      utils.type.DECREASE
    );
		return res.status(200).send(created);
  } catch (error) {
    return res.status(500).send({ message: "create device managed failed" });
  }
}
async function updateStatus(req, res, next) {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const deviceDamaged = DeviceDamagedService.findOne({ id });
		if (!deviceDamaged) return res.status(500).send({ message: "nod found device damaged" });

		const updated = DeviceDamagedService.updated({ status }, id);
		if (!updated) res.status(500).send({ message: "update status failed" });

		return res.status(200).send(updated);
  } catch (error) {
    return res.status(500).send({ message: "update status failed" });
  }
}
async function remove(req, res, next) {
	try {
		const { id } = req.params;
		const deleted = await DeviceDamagedService.deleted(id);
		return res.status(200).send(deleted);
  } catch (error) {
    return res.status(500).send({ message: "remove failed" });
  }
}

module.exports = {
	getAll,
	getOne,
	create,
	updateStatus,
	remove
};
