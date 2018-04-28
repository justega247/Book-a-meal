import meals from '../seedData/dummyMeal';

/**
 * @class Meals
 */
class Meals {
  /**
 * @return {Object} deleted meal
 * @param {param} req
 * @param {param} res
 */
  static deleteMeal(req, res) {
    const mealId = parseInt(req.params.mealId);

    const findMealWithId = meal => meal.mealId === mealId;

    const index = meals.findIndex(findMealWithId);

    if (index === -1) {
      return res.status(404).json({
        message: 'There is no meal with that mealId'
      });
    }
    meals.splice(index, 1);

    return res.status(200).json({
      message: 'A meal was just deleted',
      meals
    });
  }
}

export default Meals;
