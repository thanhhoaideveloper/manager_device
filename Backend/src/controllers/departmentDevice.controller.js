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
        const { despartment_id, device_id } = req.body;
        const now = new Date();
        device_id.forEach(async item => {
            const formData = {
                despartment_id: despartment_id,
                device_id: item,
                quantity: 1,
                received_date: now
            }
            const deviceDespartment = await departmentDeviceService.getOne({despartment_id, device_id: item});
            if(deviceDespartment){
                await departmentDeviceService.plusQuantity({ quantity: deviceDespartment.quantity + 1}, {despartment_id, device_id: item});
            }else{
                await departmentDeviceService.addDevice(formData);
                const despartment = await departmentService.findOne({id: despartment_id});
                await departmentService.updated({ device_count : despartment.device_count + 1}, despartment_id);
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
        const { despartment_id, device_id } = req.body;
        await departmentDeviceService.removeDevice(despartment_id, device_id);
        const despartment = await departmentService.findOne({id: despartment_id});
        console.log(despartment);
        await departmentService.updated({ device_count: despartment.device_count - 1 }, despartment_id);
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