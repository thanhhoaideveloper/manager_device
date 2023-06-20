const { DeviceDepartment } = require("../models");


exports.findAll = async () => {
    return await DeviceDepartment.findAll()
}

exports.addDevice = async (formData) => {
    return await DeviceDepartment.create(formData)
}

exports.plusQuantity = async (data, {department_id, device_id}) => {
    return await DeviceDepartment.update(data, { where: { department_id, device_id }});
}

exports.removeDevice = async (department_id, device_id) => {
    return await DeviceDepartment.destroy({where: { department_id, device_id }});
}

exports.getOne = async (fields) => {
    return await DeviceDepartment.findOne({where: fields });
}

// exports.updated = async(data, id) => {
//     return await Department.update(data, { where: {id}});
// }

exports.updateQuantity = async (quantity, device_id, department_id) => {
	return await DeviceDepartment.findOne({
    where: {
      device_id,
      department_id: department_id,
    },
  })
		.then((result) => {
      return DeviceDepartment.update(
        {
          quantity: result.quantity - quantity,
        },
        {
          where: {
            device_id,
            department_id: department_id,
          },
        }
      )
        .then((res) => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    })
    .catch((err) => {
      return false;
    });

}