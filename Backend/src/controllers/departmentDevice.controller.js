const HttpException = require('../utils/httpException.util');
const departmentDeviceService = require('../services/departmentDevice.service');
const departmentService = require('../services/department.service');


async function findAll(req, res, next){
    try{
        const result = await departmentDeviceService.findAll();
        res.status(200).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message))
    }
}

async function create(req, res, next) {
    try{
        const { department_id, deviceId } = req.body;
        const now = new Date();
        deviceId.forEach(async item => {
            const formData = {
                department_id: department_id,
                device_id: item,
                quantity: 1,
                received_date: now
            }
            const deviceDepartment = await departmentDeviceService.getOne({department_id, device_id: item});
            if(deviceDepartment){
                await departmentDeviceService.plusQuantity({ quantity: deviceDepartment.quantity + 1}, {department_id, device_id: item});
            }else{
                await departmentDeviceService.addDevice(formData);
                const department = await departmentService.findOne({id: department_id});
                await departmentService.updated({ device_count : department.device_count + 1}, department_id);
            }
        })
        return res.status(201).send([]);
    }catch(err){
        console.log(err);
        next(new HttpException(500, err.errors[0].message));
    }
}

async function remove(req, res, next){
    try{
        const { department_id, device_id } = req.body;
        await departmentDeviceService.removeDevice(department_id, device_id);
        const department = await departmentService.findOne({id: department_id});
        console.log(department);
        await departmentService.updated({ device_count: department.device_count - 1 }, department_id);
        res.status(200).send({});
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}



module.exports = {
    create,
    findAll,
    remove
}