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
  static mealDataValidation(req, res, next) {
    const { name, category, price, } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, it seems your meal name is empty'
        });
    }

    if (name.trim().length < 2) {
      return res.status(400)
        .json({
          message: 'Sorry, your meal name has to be longer'
        });
    }

    if (category.trim().length < 2) {
      return res.status(400)
        .json({
          message: 'Sorry, your category name has to be longer'
        });
    }

    if (category.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, meal category cannot be empty'
        });
    }

    if (!price) {
      return res.status(400)
        .json({
          message: 'Please, you need to specify a price'
        });
    }

    if (name.trim().match(/[\w\s]+/) === false) {
      return res.status(400)
        .json({
          message: 'Sorry, that meal name is not valid'
        });
    }

    if (!Number.isInteger(price)) {
      return res.status(400)
        .json({
          message: 'Sorry, your price value can only be an integer'
        });
    }

    if (!validator.isAlpha(category)) {
      return res.status(400)
        .json({
          message: 'Sorry, the category you have entered in, is invalid'
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
  static mealUpdateValidation(req, res, next) {
    const { price, name, category } = req.body;

    if (name && name.trim().length < 2) {
      return res.status(400)
        .json({
          message: 'Sorry, your meal name has to be longer'
        });
    }

    if (category && category.trim().length < 2) {
      return res.status(400)
        .json({
          message: 'Sorry, your category name has to be longer'
        });
    }

    if (price) {
      if (!Number.isInteger(price)) {
        return res.status(400)
          .json({
            message: 'Sorry, you cannot update the price field with that value'
          });
      }
    }
    next();
  }
}

export default ValidateMeal;
