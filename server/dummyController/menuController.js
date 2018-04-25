import meals from '../seedData/dummyMeal';

/**
 * @class Menu
 */
class Menu {
  /**
 * @return {Object} menu
 * @param {param} req
 * @param {param} res
 */
  static postMenu(req, res) {

    const shuffle = (array) => {
      let tmp;
      let current;
      let top = array.length;
      if(top) {
        while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }
      return array;
    }
    let mealshuffled = shuffle(meals);

    if (mealshuffled.length > 2) {
      return res.status(200).json({
        message: 'The menu for the day',
        menu: mealshuffled.slice(2)});
    }
    return res.status(400).json({
      message: 'Sorry no menu for today'
    });
  };
};

export default Menu;
