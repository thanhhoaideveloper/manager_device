const userRouter = require('./user.route'); 
const loginRouter = require('./auth.route');
const categoryRouter = require('./category.route');
const deviceRouter = require('./device.route');

function combineRoute(app){
    app.use('/users/api/v1', userRouter);
    app.use('/login/api/v1', loginRouter);
    app.use('/categories/api/v1', categoryRouter);
    app.use('/device/api/v1', deviceRouter)
}

module.exports = combineRoute;