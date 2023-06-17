const HttpException = require('../utils/httpException.util');
const departmentService = require('../services/department.service');

async function getAll(req, res){
    try {
        const data  = await departmentService.findAll();
        if(!data){
            res.status(500).send({
                message: "Not get category!"
            })
        }
        return res.status(200).send(data);
    }catch (e) {
        console.log(e)
    }
}

async function getAllDevice(req, res, next){
    const { id } = req.params;
    const result = await departmentService.getAllDevice({id: id})
    return res.status(200).send(result);
}   


async function getOne(req, res) {
    const { id } = req.params;
    const result = await departmentService.findOne({ id });
    
    if(!result){
        res.status(404).send({
            message: "Department Not found!"
        })
    }

    res.status(200).send(result);
}

async function create(req, res, next) {
    try{
        const formData = req.body;
        const result = await departmentService.create(formData);
        return res.status(201).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}

async function update(req, res, next){
    try{
        const formData = req.body;
        const { id } = req.params;
        const result = await departmentService.updated(formData, id);
        const departmentUpdate = await departmentService.findOne({ id })
        if(!departmentUpdate){
            return next(new HttpException(404, "Department not found!"));
        }
        res.status(200).send(departmentUpdate);
    }catch(err){
        next(new HttpException(500, err.errors[0].message))
    }
}

async function deleted(req, res, next){
    try{
        const { id } = req.params;
        const result = await departmentService.deleted(id);
        if(!result){
            return next(new HttpException(404, "Department not found!"));
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
    deleted,
    getAllDevice
}