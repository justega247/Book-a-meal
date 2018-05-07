module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {}, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Order.belongsToMany(models.Meal, {
      through: OrderMeals,
      foreignKey: orderId
    })
  };
  return Order;
};
