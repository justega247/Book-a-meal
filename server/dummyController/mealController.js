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

  /**
 * @return {Object} added meal
 * @param {param} req
 * @param {param} res
 */
  static addMeal(req, res) {
    for (let i = 0; i < meals.length; i += 1) {
      if (req.body.name.trim() === '' ||
       req.body.name.trim() === meals[i].name) {
        return res.status(400)
          .json({
            message: 'Sorry,that meal name is invalid'
          });
      } else if (req.body.category.trim() === '') {
        return res.status(400)
          .json({
          message: 'Sorry,meal category cannot be empty'
          });
      }
    }
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
}

export default Meals;
