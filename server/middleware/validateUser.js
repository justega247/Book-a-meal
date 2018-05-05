import validator from 'validator';

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
  static signUpDataValidation(req, res, next) {
    if (!validator.isEmail(req.body.email.trim())) {
      return res.status(422)
        .json({
          message: 'Sorry, your email does not match the email format'
        });
    }

    if (!validator.isAlphanumeric(req.body.username.trim())
      || req.body.username.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, your username can only contain alphanumeric characters'
        });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, you have to specify a password'
        });
    }

    if (req.body.username.trim().length < 3) {
      return res.status(400)
        .json({
          message: 'Sory, your username must be 3 characters or more'
        });
    }

    if (req.body.password.trim().length < 6) {
      return res.status(400)
        .json({
          message: 'Sorry, your password must be 6 characters or more'
        });
    }

    if (!req.body.fullname || req.body.fullname.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, you have not provided your fullName'
        });
    }

    if (req.body.fullname.trim().match(/[\w\s]+/) === false) {
      return res.status(400)
        .json({
          message: 'Please,check the spelling of your name for invalid characters'
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
  static signInDataValidation(req, res, next) {
    if (!req.body.username || req.body.username.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, your username is required'
        });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, your password is required'
        });
    }
    next();
  }
}

export default ValidateUser;
