import meals from '../seedData/dummyMeal';

/**
 * @class Meals
 */
class Meals {
/**
 * @return {Object} updated meal
 * @param {param} req
 * @param {param} res
 */
  static updateMeal(req, res) {
    let meal;
    const mealId = parseInt(req.params.mealId, 10);

    for (let i = 0; i < meals.length; i += 1) {
      if (meals[i].mealId === mealId) {
        meal = meals[i];

        const updateValueArray = Object.keys(req.body);

        for (let j = 0; j < updateValueArray.length; j += 1) {
          if (req.body[updateValueArray[j]] === '') {
            return res.status(400).json({
              message: 'Sorry,you have to enter valid value(s).'
            });
          }
        }
        meal = {
          name: req.body.name || meals[i].name,
          category: req.body.category || meals[i].category,
          price: req.body.price || meals[i].price,
          image: req.body.image || meals[i].image
        };
        return res.status(200).json({
          message: 'Success',
          mealUpdate: meal
        });
      }
    }
    return res.status(404).json({
      message: 'Sorry,no meal with that id exists'
    });
  }
}

export default Meals;
