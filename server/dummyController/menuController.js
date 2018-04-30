import menu from '../seedData/dummyMenu';

let mealMenu;
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
    const shuffle = (array) => {
      let tmp;
      let current;
      let top = array.length - 1;

      while (top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
        top -= 1;
      }
      return array;
    };

    mealMenu = req.body.meals;

    if (mealMenu.length < 3) {
      return res.status(400).json({
        message: 'You need more meals to set up a menu'
      });
    }
    const mealshuffled = shuffle(mealMenu).slice(2);

    return res.status(201).json({
      message: 'Success',
      menu: menu.concat(mealshuffled)
    });
  }
}

export default Menu;
