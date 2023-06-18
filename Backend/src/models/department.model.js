module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("Department",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        device_count: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        is_active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        deletedAt: 'deletedAt',
        paranoid: true,
    })

    return Department;
}