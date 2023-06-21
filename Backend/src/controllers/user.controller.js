const bcrypt = require('bcrypt');

const userService = require('../services/user.service');
const userPermisionService = require('../services/userPermission.service')
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
        await userPermisionService.create(result.id, 1);
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

async function getOneUserHasPermission(req, res, next) {
	const { id } = req.params;
	const user = await userService.listPermission(id);
	if (!user) return res.status(401).send({ message: "Not found user" });
	return res.status(200).send(user);
}

async function changeRole(req, res, next){
    const userRole = {
        USER: 1,
        DEVICE_MANAGEMENT: 2,
        DEPARTMENT_MANAGEMENT: 4,
        ADMIN: 3,
    }

    const { user_id, role } = req.body;
    const user = await userPermisionService.findPermissionIdByUserId(user_id);
    const permission = user[0].permission_id;
    await userPermisionService.update(user_id, [permission], [userRole[role]]);
    return res.status(200).send({});

}

module.exports = {
	getAll,
	getOne,
	create,
	update,
	deleted,
	getOneUserHasPermission,
    changeRole
}