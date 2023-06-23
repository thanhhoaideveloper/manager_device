const HttpException = require('../utils/httpException.util');
const deviceService = require('../services/device.service');

async function getAll(req, res){
    const { is_active } = req.body;
    const result = await deviceService.findAll({is_active});
    return res.status(200).send(result);
}


async function getOne(req, res) {
    const { id } = req.params;
    const result = await deviceService.findOne({ id });

    if(!result){
        res.status(404).send({
            message: "Device Not found!"
        })
    }

    res.status(200).send(result);
}

async function create(req, res, next) {
    try{
        const formData = req.body;
        formData.status = 1;
        const result = await deviceService.create(formData);
        res.status(201).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}

async function update(req, res, next){
    try{
        const formData = req.body;
        const { id } = req.params;
        const result = await deviceService.updated(formData, id);
        const deviceUpdate = await deviceService.findOne({ id: result[0]})
        if(!deviceUpdate){
            return next(new HttpException(404, "Device not found!"));
        }
        res.status(200).send(deviceUpdate);
    }catch(err){
        next(new HttpException(500, err.errors[0].message))
    }
}

async function deleted(req, res, next){
    try{
        const { id } = req.params;
        const result = await deviceService.deleted(id);
        if(!result){
            return next(new HttpException(404, "Device not found!"));
        }
        res.status(200).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleted
}