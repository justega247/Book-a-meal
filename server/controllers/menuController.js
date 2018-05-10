import { Menu, Meal } from '../models';

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
    return Menu.create({
      title: req.body.title,
      userId: req.user.id
    }).then((myMenu) => {
      myMenu.setMeals(myMealsId);
      return res.status(201).send(myMenu);
    }).catch(e => res.status(400).send(e));
  }

  /**
 * @return {Object} menu
 * @param {param} req
 * @param {param} res
 */
  static retrieveMenu(req, res) {
    return Menu.find({
      where: ({
        id: req.headers.id
      }),
      include: [{
        model: Meal
      }]
    })
      .then((dmenu) => {
        dmenu.getMeals({ attributes: ['imageUrl', 'name', 'price'] })
          .then(dmeals => res.status(200).json({
            message: "Today's Menu",
            dmeals
          }));
      })
      .catch(e => res.status(400).send(e));
  }
}

export default TheMenu;
