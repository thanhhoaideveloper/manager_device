module.exports = (sequelize, DataTypes) => {
    const DeviceDepartment = sequelize.define("DeviceDepartment",{
        despartment_id: {
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
    }, {
        deletedAt: 'deletedAt',
        paranoid: true,
    })

    return DeviceDepartment;
}