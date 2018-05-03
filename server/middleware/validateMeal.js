import { body } from 'express-validator/check';

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
    if (!body('name') || body('name').trim() === '') {
      return res.status(400)
        .json({
          message: 'Meal name,should not be empty'
        });
    }

    if (!isAlpha(body('name'))) {
      return res.status(400)
        .json({
          message: 'Your meal name contains invalid characters'
        });
    }

    if (!Numeric(body('price'))) {
      return res.status(400)
        .json({
          message: 'Your price can only be numeric'
        });
    }

    if (!isAlpha(body('category'))) {
      return res.status(400)
        .json({
          message: 'Please,specify a proper category'
        });
    }
    next();
  }
}

export default ValidateMeal;
