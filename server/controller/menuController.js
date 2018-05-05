import menu from '../seedData/menu';
import meals from '../seedData/meals';

/**
 * @class Menu
 */
class Menu {
  /**
 * @return {Object} menu
 * @param {param} req
 * @param {param} res
 */
  static addMenu(req, res) {
    const dayMenu = [];

    // mealMenu is an array containing the mealid's of meals to add to the menu
    const mealMenu = req.body.meals;

    mealMenu.forEach((one) => {
      menu.push(meals.find(meal => parseInt(one, 10) === meal.mealId));
    })
    dayMenu.push(...menu);
    const todayMenu = dayMenu.filter(dMenu => dMenu !== undefined);

    return res.status(201).json({
      message: 'Success',
      todayMenu
    });
  }

  /**
 * @return {Object} menu
 * @param {param} req
 * @param {param} res
 */
  static retrieveMenu(req, res) {
    const myMenu = [];
    myMenu.push(...menu);
    const realMenu = myMenu.filter(aMenu => aMenu !== undefined);
    if (realMenu.length !== 0) {
      return res.status(200)
        .json({
          message: "Today's menu",
          menuToday: realMenu
        });
    }
    return res.status(404)
      .json({
        message: 'Sorry, no menu has been set'
      });
  }
}

export default Menu;
