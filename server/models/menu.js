module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {}, {});
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
