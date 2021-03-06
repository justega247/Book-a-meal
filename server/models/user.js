import { hashSync } from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('password', hashSync(val));
      },
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['customer', 'admin'],
      defaultValue: 'customer',
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'ownMeals',
    });

    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'ownOrders',
    });

    User.hasOne(models.Menu, {
      foreignKey: 'userId',
      as: 'ownMenu'
    });
  };
  return User;
};
