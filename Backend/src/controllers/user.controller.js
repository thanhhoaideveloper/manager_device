const userModel = require('../models/user.model');

async function getAll(req, res){
    userModel.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Show User Not Working!'
            })
        }else{
            res.send(data);
        }
    })
}

module.exports = {
    getAll
}