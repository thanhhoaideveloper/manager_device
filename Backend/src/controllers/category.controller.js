const categoryService = require('../services/category.service');

async function getAll(req, res) {
    const data  = await categoryService.findAll();
    if(!data){
        res.status(500).send({
            message: "Not get category!"
        })
    }
    return res.status(200).send(data);
}

async function create(req, res) {
    const { code, name, is_active } = req.body;
    const { status, value } = await categoryService.create({code, name, is_active});
    if(!status){
        res.status(500).send({
            message: value
        })
    }
    res.status(201).send(value);
}

async function findOne(req, res){
    const fields = req.params;
    const { status, value } = await categoryService.fillOne(fields);
    if(!status){
        res.status(500).send({
            message: value
        })
    }

    if(!value){
        res.status(404).send({
            message: "NOt found!"
        })
    }

    res.status(200).send(value);
}

async function update(req, res){
    const data = req.body;
    const id = req.params.id;
    const { status, value } = await categoryService.update(data, id);
    if(!status) {
        res.status(500).send({
            message: value
        })
    }
    const { inorge , value : category} = await categoryService.fillOne({id: '1'});
    res.status(200).send(category);
}

async function deleteCategory(req, res){
    const { id } = req.params;
    await categoryService.deleted(id);
    res.status(200).send({
        message: "Deleted!"
    })
}

module.exports = {
    getAll,
    create,
    findOne,
    update,
    deleteCategory
}