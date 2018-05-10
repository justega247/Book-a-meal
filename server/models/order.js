module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    title: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId'
    });
  };
  return Order;
};
