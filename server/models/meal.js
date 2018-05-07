module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Meal.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE',
    });

    Meal.belongsToMany(models.Order, {
      through: OrderMeals,
      foreignKey: mealId
    });
  };
  return Meal;
};
