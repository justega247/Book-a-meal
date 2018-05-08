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
      return Meal.findAll().then((meals) => {
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
}

export default Meals;
