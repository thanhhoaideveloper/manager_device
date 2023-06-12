const userRouter = require('./user.route'); 
const categoryRouter = require('./category.route');
const deviceRouter = require('./device.route');
const despartmentRouter = require('./despartment.route');
const authRouter = require('./auth.route');

function combineRoute(app){
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/device', deviceRouter);
    app.use('/api/v1/despartment', despartmentRouter)
}

module.exports = combineRoute;