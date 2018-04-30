import meals from '../seedData/dummyMeal';
import menu from '../seedData/dummyMenu';

/**
 * @class Menu
 */
class Menu {
  /**
 * @return {Object} menu
 * @param {param} req
 * @param {param} res
 */
  static availableMenu(req, res) {
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
    const mealshuffled = menu.concat(shuffle(meals));

    if (mealshuffled.length > 2) {
      return res.status(200).json({
        message: 'Success',
        menu: mealshuffled.slice(2)
      });
    }
    return res.status(400).json({
      message: 'Sorry,no menu for today',
      menu: []
    });
  }
}

export default Menu;
