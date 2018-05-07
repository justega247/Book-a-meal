module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Menu',
          key: 'id',
          as: 'menuId',
        }
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Orders',
          key: 'id',
          as: 'orderId',
        }
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
    return queryInterface.dropTable('Meals');
  }
};
