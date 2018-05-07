module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderMeals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      mealId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('OrderMeals');
  }
};
