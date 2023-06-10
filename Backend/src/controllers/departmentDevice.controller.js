const HttpException = require('../utils/httpException.util');
const departmentDeviceService = require('../services/departmentDevice.service');


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
        const { despartment_id, deviceId } = req.body;
        const now = new Date();
        const data = deviceId.map(item => {
            return {
                despartment_id: despartment_id,
                device_id: item,
                received_date: now
            }
        })
        const result = await departmentDeviceService.addDevice(data);
        return res.status(201).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}



module.exports = {
    create,
    findAll
}