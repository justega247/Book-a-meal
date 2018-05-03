import validator from 'validator';

/**
 * @class Validate Meal
 */
class ValidateMeal {
  /**
   * validate meal input on creation
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static mealData(req, res, next) {
    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400)
        .json({
          message: 'Meal name,should not be empty'
        });
    }

    if (req.body.category.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry,meal category cannot be empty'
        });
    }

    if (!req.body.price) {
      return res.status(400)
        .json({
          message: 'Please specify a price'
        });
    }

    if (req.body.name.trim().match(/[\w\s]+/) === false) {
      return res.status(400)
        .json({
          message: 'Sorry,that meal name is invalid'
        });
    }

    if (!Number.isInteger(req.body.price)) {
      return res.status(400)
        .json({
          message: 'Your price can only be numeric'
        });
    }

    if (!validator.isAlpha(req.body.category)) {
      return res.status(400)
        .json({
          message: 'Please,specify a proper category'
        });
    }
    next();
  }
}

export default ValidateMeal;
