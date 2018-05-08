module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    category: DataTypes.STRING,
    menuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Menu',
        key: 'id',
        as: 'menuId',
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
        as: 'orderId',
      }
    },
  }, {});
  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Meal.belongsTo(models.Menu, {
      foreignKey: 'menuId',
    });

    Meal.belongsToMany(models.Order, {
      through: 'OrderMeals',
      foreignKey: 'mealId'
    });
  };
  return Meal;
};
