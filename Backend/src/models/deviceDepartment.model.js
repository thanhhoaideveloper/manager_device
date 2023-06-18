module.exports = (sequelize, DataTypes) => {
    const DeviceDepartment = sequelize.define("DeviceDepartment",{
        department_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        device_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            default: 0
        },
        received_date:{
            type: DataTypes.DATE
        }
    })

    return DeviceDepartment;
}