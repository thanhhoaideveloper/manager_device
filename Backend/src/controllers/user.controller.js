const bcrypt = require('bcrypt');

const userService = require('../services/user.service');
const HttpException = require('../utils/httpException.util');

async function getAll(req, res, next){
    try{
        const result = await userService.findAll();
        return res.status(200).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}


async function getOne(req, res, next){
    try{
        const { id } = req.params;
        const result = await userService.findOne({id});
        res.status(200).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message))
    }
}

async function create(req, res, next){
    try{
        const formData = req.body;
        if(formData.password){
            formData.password = bcrypt.hashSync(formData.password, 10);
        }
        const result = await userService.create(formData);
        res.status(201).send(result);
    }catch(err){
        next(new HttpException(500, err.errors[0].message))
    }
}

async function update(req, res, next){
    try{
        const formData = req.body;
        const { id } = req.params;
        await userService.updated(id,formData);
        const userUpdate = await userService.findOne({ id });
        if(!userUpdate){
            return next(new HttpException(404, "User not found!"));
        }
        res.status(200).send(userUpdate);
    }catch(err){
        next(new HttpException(500, err.errors[0].message));
    }
}

async function deleted(req, res, next){
    try{
        const { id } = req.params;
        const result = userService.deleted(id);
        if(!result){
            return next(new HttpException(404, "User not found!"));
        }
        const { password, ...data } = result;
        res.status(200).send(data);
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