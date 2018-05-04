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
    let dayMenu = [];
    let mealMenu;
    let todayMenu;

    mealMenu = req.body.meals;
    for(let i = 0; i < mealMenu.length; i += 1) {
      menu.push(meals.find((one) => {
        return parseInt(mealMenu[i], 10) === one.mealId;
      }))
    }
    dayMenu.push(...menu);
    todayMenu = dayMenu.filter(dMenu => dMenu !== undefined);

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
    let myMenu = [];
    let realMenu;
    myMenu.push(...menu)
    realMenu = myMenu.filter(aMenu => aMenu !== undefined)
    if(realMenu.length !== 0) {
      return res.status(200)
        .json({
          message: "Today's menu",
          menuToday: realMenu
        })
    }
    return res.status(404)
      .json({
        message: 'Sorry, no menu has been set'
      })
  }
}

export default Menu;
