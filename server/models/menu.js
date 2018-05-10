module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    title: DataTypes.STRING
  }, {});
  Menu.associate = (models) => {
    // associations can be defined here
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Menu.hasMany(models.Meal, {
      foreignKey: 'menuId'
    });
  };
  return Menu;
};
