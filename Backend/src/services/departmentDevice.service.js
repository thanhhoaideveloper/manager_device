const { DeviceDepartment } = require("../models");


exports.findAll = async () => {
    return await DeviceDepartment.findAll()
}

exports.addDevice = async (formData) => {
    return await DeviceDepartment.create(formData)
}

exports.plusQuantity = async (data, {despartment_id, device_id}) => {
    return await DeviceDepartment.update(data, { where: { despartment_id, device_id }});
}

exports.removeDevice = async (despartment_id, device_id) => {
    return await DeviceDepartment.destroy({where: { despartment_id, device_id }});
}

exports.getOne = async (fields) => {
    return await DeviceDepartment.findOne({where: fields });
} 

// exports.updated = async(data, id) => {
//     return await Department.update(data, { where: {id}});
// }

