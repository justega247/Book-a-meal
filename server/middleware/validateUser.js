import { body } from 'express-validator/check';

/**
 * @class Validate Users
 */
class ValidateUser {
  /**
   * validate user input on signUp
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static signUp(req, res, next) {
    if (!isEmail(body('email'))) {
      return res.status(400)
        .json({
          message: 'Sorry, your email is invalid'
        });
    }

    if (!isAlphanumeric(body('username')) || body('username').trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, that username is invalid'
        });
    }

    if (!body('password') || body('password').trim() === '') {
      return res.status(400)
        .json({
          message: 'password cannot be empty'
        });
    }

    if (!body('username').islength({ min: 3 })) {
      return res.status(400)
        .json({
          message: 'username must be 3 characters or more'
        });
    }

    if (!body('password').isLength({ min: 6 })) {
      return res.status(400)
        .json({
          message: 'password must be 6 characters or more'
        });
    }

    if (!body('fullname') || body('fullName').trim() === '') {
      return res.status(400)
        .json({
          message: 'fullName not provided'
        });
    }

    if (!body('fullname').matches(/[\w\s]+/)) {
      return res.status(400)
        .json({
          message: 'Please,check the spelling of your name'
        });
    }
    next();
  }

  /**
   * validate user input on signIn
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static signIn(req, res, next) {
    if (!body('username') || body('username').trim() === '') {
      return res.status(400)
        .json({
          message: 'Username is required'
        });
    }

    if (!body('password') || body('password').trim() === '') {
      return res.status(400)
        .json({
          message: 'Password is required'
        });
    }
    next();
  }
}

export default ValidateUser;
