module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category",{
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
        is_active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        deletedAt: 'deletedAt',
        paranoid: true,
    })

    return Category;
}