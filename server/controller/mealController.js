import meals from '../seedData/meals';

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
    if (meals.length === 0) {
      return res.status(404).json({
        message: 'Sorry, no available meal',
        meals: []
      });
    } else if (meals.length > 0) {
      const mealsAvailable = meals.map(meal => Object.assign({}, meal));
      return res.status(200).json({
        message: 'Success',
        meals: mealsAvailable
      });
    }
  }

  /**
 * @return {Object} added meal
 * @param {param} req
 * @param {param} res
 */
  static addMeal(req, res) {
    // Validate that meal name data is unique.
    const meal = meals.find(one => req.body.name.trim() === one.name);

    if (meal) {
      return res.status(409)
        .json({
          message: 'Sorry, that meal name already exists'
        });
    }

    // Create the meal and push into the meals array
    meals.push({
      mealId: meals[meals.length - 1].mealId + 1,
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
    // Validate that meal name data is unique
    const meall = meals.find(one => req.body.name.trim() === one.name);

    if (meall) {
      return res.status(409)
        .json({
          message: 'Sorry, that meal name already exists'
        });
    }

    const mealId = parseInt(req.params.mealId, 10);

    let meal = meals.find(one => one.mealId === mealId);

    if (meal) {
      const updateValueArray = Object.keys(req.body);
      // A check to make sure none of the input data is an empty string
      for (let j = 0; j < updateValueArray.length; j += 1) {
        if (req.body[updateValueArray[j]] === '') {
          return res.status(400).json({
            message: 'Sorry, one or more of your field has an empty value.'
          });
        }
      }

      const findMealWithId = meal1 => meal1.mealId === mealId;
      const index = meals.findIndex(findMealWithId);

      // Update the valid specified fields of the meal
      meal = {
        mealId: meal.mealId,
        name: req.body.name || meal.name,
        category: req.body.category || meal.category,
        price: req.body.price || meal.price,
        image: req.body.image || meal.image
      };

      meals.splice(index, 1, meal);

      return res.status(200).json({
        message: 'Success',
        mealUpdate: meal
      });
    }
    return res.status(404).json({
      message: 'Sorry, no meal with that id exists'
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

    return res.status(204).json({
      message: 'A meal was just deleted',
    });
  }
}

export default Meals;
