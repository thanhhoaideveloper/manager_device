const userRouter = require('./user.route'); 

function combineRoute(app){
    app.use('/users', userRouter);
}

module.exports = combineRoute;