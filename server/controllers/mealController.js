import { pick } from 'lodash';
import { Meal } from '../models';

/**
 * @class Meals
 */
class Meals {
/**
 * @return {Object} mealsAvailable
 * @param {param} req
 * @param {param} res
 */
  static retrieveMeals(req, res) {
    const userMe = pick(req.user, ['status']);
    if (userMe.status === 'admin') {
      return Meal.all().then((meals) => {
        if (meals.length === 0) {
          return res.status(400).json({
            message: 'No meals found'
          });
        }
        res.status(200).json({
          message: 'Success',
          meals
        });
      });
    }
    return res.status(401).send();
  }

  /**
 * @return {Object} added meal
 * @param {param} req
 * @param {param} res
 */
  static addMeal(req, res) {
    const userMe = pick(req.user, ['status','Id']);
    if (userMe.status !== 'admin') {
      return res.status(401).send();
    }
    Meal.findOne({
      where: {
        name: req.body.name
      }
    }).then((meal) => {
      if(meal) {
        res.status(409)
          .json({
            message: 'Sorry, that meal name already exists'
          });
        return;
      }
      return Meal.create({
        name: req.body.name.trim(),
        price: req.body.price,
        imageUrl: req.body.imageUrl.trim(),
        category: req.body.category.trim(),
        userId: userMe.Id
      }).then((dmeal) => {
        const newMeal = pick(dmeal, [
          'name',
          'imageUrl',
          'price'
        ]);
        res.status(201).json({
          message: 'A new meal was just created',
          newMeal
        })
      }).catch((e) => res.status(500).send(e))
    })
  }
}

export default Meals;
