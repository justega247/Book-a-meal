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
    const error = [];
    let { name, category, price, } = req.body;
    name = name.trim();
    category = category.trim();
    const re = /\s/g;
    const nameStr = name.toLowerCase().replace(re, '');
    const categoryStr = category.toLowerCase().replace(re, '');

    if (!nameStr || nameStr.length < 2 || /[^a-z]/i.test(nameStr)) {
      error.push({ name: 'Your meal name is invalid' });
    }

    if (categoryStr.length < 2 || /[^a-z]/i.test(categoryStr)) {
      error.push({ category: 'The category you have specified is invalid!' });
    }

    if (!price || !Number.isInteger(price)) {
      error.push({ price: 'The price you have specified is invalid!' });
    }

    if (error.length > 0) {
      return res.status(400).json({
        status: false,
        error
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
    const error = [];
    let { name, category, price, } = req.body;
    name = name.trim();
    category = category.trim();
    const re = /\s/g;
    const nameStr = name.toLowerCase().replace(re, '');
    const categoryStr = category.toLowerCase().replace(re, '');

    if (nameStr && nameStr.length < 2) {
      error.push({ name: 'Sorry, your meal name is invalid' });
    }

    if (categoryStr && categoryStr.length < 2) {
      error.push({ category: 'Sorry, your meal category is invalid' });
    }

    if (price) {
      if (!Number.isInteger(price)) {
        error.push({ price: 'Sorry, your meal price is invalid' });
      }
    }

    if (error.length > 0) {
      return res.status(400).json({
        status: false,
        error
      });
    }

    next();
  }
}

export default ValidateMeal;
