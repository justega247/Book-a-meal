import meals from '../seedData/dummyMeal';

/**
 * @class Meals
 */
class Meals {
/**
 * @return {Object} mealsAvailable
 * @param {param} req
 * @param {param} res
 */
  static mealsAvailable(req, res) {
    if (meals.length === 0) {
      return res.status(200).json({
        message: 'Sorry no available meal',
        meals: []
      });
    } else if (meals.length > 0) {
      const mealsAvailable = meals.map(meal => Object.assign({}, meal));
      return res.status(200).json({
        message: 'Success',
        meals: mealsAvailable
      });
    }
    return res.status(500);
  }
}

export default Meals;
