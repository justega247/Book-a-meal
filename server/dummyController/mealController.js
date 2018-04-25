import meals from '../seedData/dummyMeal';

/**
 * @class Meals
 */
class Meals {
/**
 * @return {Object} get meals
 * @param {param} req
 * @param {param} res
 */
  static getMeals(req, res) {
    if (meals.length === 0) {
      return res.status(200).send('Sorry no available meal');
    } else if (meals.length > 0) {
      const mealsAvailable = meals.map(meal => Object.assign({}, meal));
      return res.status(200).send(mealsAvailable);
    }
    return res.status(500);
  }
}

export default Meals;
