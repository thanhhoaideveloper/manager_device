const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const deviceRouter = require('./device.route');
const departmentRouter = require('./department.route');
const authRouter = require('./auth.route');
const permissionRouter = require('./permission.route');

function combineRoute(app){
	app.use('/api/v1/auth', authRouter);
	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/categories', categoryRouter);
	app.use('/api/v1/device', deviceRouter);
	app.use('/api/v1/despartment', departmentRouter);
	app.use("/api/v1/permission", permissionRouter);
}

module.exports = combineRoute;