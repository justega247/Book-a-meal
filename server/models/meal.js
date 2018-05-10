module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
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
    });

    Meal.hasMany(models.Order, {
      foreignKey: 'mealId'
    });
  };
  return Meal;
};
