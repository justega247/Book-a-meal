import meals from '../seedData/dummyMeal';

/**
 * @class Meals
 */
class Meals {
  /**
 * @return {Object} leftover meals
 * @param {param} req
 * @param {param} res
 */
  static removeMeal(req, res) {
    const mealId = parseInt(req.params.mealId);

    const findMealWithId = meal => meal.mealId === mealId;

    const index = meals.findIndex(findMealWithId);

    if (index === -1) {
      return res.status(404).json({
        message: 'Sorry,there is no meal with that mealId'
      });
    }
    meals.splice(index, 1);

    return res.status(200).json({
      message: 'A meal was just deleted',
      meals: meals
    });
  }
}

export default Meals;
