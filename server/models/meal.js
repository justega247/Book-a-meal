'use strict';
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
  };
  return Meal;
};