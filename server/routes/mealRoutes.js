import express from 'express';

import Meals from '../controllers/mealController';
import ValidateMeal from '../middleware/validateMeal';
import { authenticated } from '../middleware/authenticate';

const router = express.Router();

router.use('*', authenticated);

router.get('/', Meals.retrieveMeals);
router.post('/', ValidateMeal.mealDataValidation, Meals.addMeal);
router.put('/:mealId', ValidateMeal.mealUpdateValidation, Meals.updateMeal);
router.delete('/:mealId', Meals.removeMeal);

module.exports = router;

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

module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    title: DataTypes.STRING,
  }, {});
  Menu.associate = (models) => {
    // associations can be defined here

    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Menu.hasMany(models.Meal, {
      foreignKey: 'mealId'
    });
  };
  return Menu;
};

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
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

    Meal.hasMany(models.Order, {
      foreignKey: 'mealId'
    });
  };
  return Meal;
};


module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
