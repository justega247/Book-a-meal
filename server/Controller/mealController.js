import meals from '../seedData/Meal';

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

  /**
 * @return {Object} added meal
 * @param {param} req
 * @param {param} res
 */
  static addMeal(req, res) {
    // Validate meal creation data
    for (let i = 0; i < meals.length; i += 1) {
      if (req.body.name.trim() === meals[i].name) {
        return res.status(400)
          .json({
            message: 'Sorry,that meal name is invalid'
          });
      }
    }
    // Create the meal and push into the meals array
    meals.push({
      mealId: meals.length + 1,
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price
    });
    return res.status(201)
      .json({
        message: 'Success',
        details: meals[meals.length - 1]
      });
  }

  /**
 * @return {Object} updated meal
 * @param {param} req
 * @param {param} res
 */
  static updateMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);

    let meal = meals.find(one => one.mealId === mealId);

    if (meal) {
      const updateValueArray = Object.keys(req.body);

      // A check to make sure none of the input data is an empty string
      for (let j = 0; j < updateValueArray.length; j += 1) {
        if (req.body[updateValueArray[j]] === '') {
          return res.status(400).json({
            message: 'Sorry,you have to enter valid value(s).'
          });
        }
      }
      // Update the valid specified fields of the meal
      meal = {
        name: req.body.name || meal.name,
        category: req.body.category || meal.category,
        price: req.body.price || meal.price,
        image: req.body.image || meal.image
      };
      return res.status(200).json({
        message: 'Success',
        mealUpdate: meal
      });
    }
    return res.status(404).json({
      message: 'Sorry,no meal with that id exists'
    });
  }

  /**
 * @return {Object} leftover meals
 * @param {param} req
 * @param {param} res
 */
  static removeMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
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
      leftoverMeals: meals
    });
  }
}

export default Meals;
