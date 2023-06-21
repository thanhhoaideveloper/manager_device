const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const deviceRouter = require('./device.route');
const departmentRouter = require('./department.route');
const authRouter = require('./auth.route');
const permissionRouter = require('./permission.route');
const requestDeviceRouter = require("./requestDevice.route");
const deviceDamagedRouter = require("./deviceDamaged.route");

function combineRoute(app){
	app.use('/api/v1/auth', authRouter);
	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/categories', categoryRouter);
	app.use('/api/v1/device', deviceRouter);
	app.use('/api/v1/department', departmentRouter);
	app.use("/api/v1/permission", permissionRouter);
	app.use("/api/v1/request_device", requestDeviceRouter);
	app.use("/api/v1/device_damaged", deviceDamagedRouter);
}

module.exports = combineRoute;