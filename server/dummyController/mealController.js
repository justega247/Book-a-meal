import meals from '../seedData/dummyMeal';

/**
 * @class Meals
 */
class Meals {
/**
 * @return {Object} added meal
 * @param {param} req
 * @param {param} res
 */
  static postMeal(req, res) {
    for (let i = 0; i < meals.length; i += 1) {
      if (req.body.name.trim() === '' ||
         req.body.name.trim() === meals[i].name) {
        return res.status(400)
          .json({
            message: 'Your meal name is invalid'
          });
      } else if (req.body.category.trim() === '') {
        return res.status(400)
          .json({
            message: 'Your meal category cannot be empty'
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
    return res.status(200)
      .json({
        message: 'A new meal was added',
        details: meals[meals.length - 1]
      });
  }
}

export default Meals;
