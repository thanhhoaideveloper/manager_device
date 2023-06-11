const userRouter = require('./user.route'); 
const loginRouter = require('./auth.route');
const categoryRouter = require('./category.route');
const deviceRouter = require('./device.route');
const despartmentRouter = require('./despartment.route');

function combineRoute(app){
    app.use('/api/v1/users', userRouter);
    app.use('/login/api/v1', loginRouter);
    app.use('/categories/api/v1', categoryRouter);
    app.use('/device/api/v1', deviceRouter)
    app.use('/despartment/api/v1', despartmentRouter)
}

module.exports = combineRoute;