import { Meal, Menu } from '../models';

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
    }).then((myMenu) => {
      return myMenu.setMeals(myMealsId)
    })
    .catch((e) => res.status(400).send());
  }
}

export default TheMenu;
