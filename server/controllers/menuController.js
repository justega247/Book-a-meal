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
    })
      .catch(() => res.status(500).send({
        status: false,
        message: 'Sorry, your request could not be processed'
      }));
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
      .then((returnedMenu) => {
        returnedMenu.getMeals({ attributes: ['imageUrl', 'name', 'price'] })
          .then(mealsFound => res.status(200).json({
            status: true,
            message: "Today's Menu",
            mealsFound
          }));
      })
      .catch(() => res.status(500).send({
        status: false,
        message: 'Sorry, your request could not be processed'
      }));
  }
}

export default TheMenu;
