module.exports = (sequelize, DataTypes) => {
  const OrderMeals = sequelize.define('OrderMeals', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  OrderMeals.associate = (models) => {
    // associations can be defined here
    OrderMeals.belongsTo(models.Meal, {
      foreignkey: 'mealId'
    });

    OrderMeals.belongsTo(models.Order, {
      foreignkey: 'orderId'
    });
  };
  return OrderMeals;
};
