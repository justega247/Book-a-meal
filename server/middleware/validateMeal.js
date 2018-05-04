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
          message: 'Sorry,it seems your meal name is empty'
        });
    }

    if (req.body.category.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, meal category cannot be empty'
        });
    }

    if (!req.body.price) {
      return res.status(400)
        .json({
          message: 'Please, you need to specify a price'
        });
    }

    if (req.body.name.trim().match(/[\w\s]+/) === false) {
      return res.status(400)
        .json({
          message: 'Sorry, that meal name is not valid'
        });
    }

    if (!Number.isInteger(req.body.price)) {
      return res.status(400)
        .json({
          message: 'Sorry, your price value can only be an integer'
        });
    }

    if (!validator.isAlpha(req.body.category)) {
      return res.status(400)
        .json({
          message: 'Sorry, the category you have entered in is invalid'
        });
    }
    next();
  }

  /**
   * validate meal input on update
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static mealUpdate(req, res, next) {
    if (req.body.category && req.body.category.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, you have to specify a proper category'
        });
    }

    if (req.body.price) {
      if (!Number.isInteger(req.body.price)) {
        return res.status(400)
          .json({
            message: 'Sorry, you cannot update the price field with that value'
          });
      }
    }

    if (req.body.name && (req.body.name.trim() === '')) {
      return res.status(400)
        .json({
          message: 'Sorry, you have not specified any meal name'
        });
    }
    next();
  }
}

export default ValidateMeal;
