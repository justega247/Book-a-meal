import { Menu } from '../models';

/**
 * @class Menu
 */
class TheMenu {
  /**
 * @return {Object} menu
 * @param {param} req
 * @param {param} res
 */
  static addMenu(req, res) {
    const myMealsId = req.body.meals;
    Menu.create({
      title: req.body.title,
      userId: req.user.id
    }).then(myMenu => myMenu.setMeals(myMealsId))
      .catch(e => res.status(400).send(e));
  }
}

export default TheMenu;
