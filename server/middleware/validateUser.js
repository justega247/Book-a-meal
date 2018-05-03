import validator from 'validator'

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
    if (!validator.isEmail(req.body.email.trim())) {
      return res.status(400)
        .json({
          message: 'Sorry, your email is invalid'
        });
    }

    if (!validator.isAlphanumeric(req.body.username.trim())
      || req.body.username.trim() === '') {
      return res.status(400)
        .json({
          message: 'Sorry, that username is invalid'
        });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .json({
          message: 'password cannot be empty'
        });
    }

    if (req.body.username.trim().length < 3 ) {
      return res.status(400)
        .json({
          message: 'username must be 3 characters or more'
        });
    }

    if (req.body.password.trim().length < 6 ) {
      return res.status(400)
        .json({
          message: 'password must be 6 characters or more'
        });
    }

    if (!req.body.fullname || req.body.fullname.trim() === '') {
      return res.status(400)
        .json({
          message: 'fullName not provided'
        });
    }

    if (req.body.fullname.trim().match(/[\w\s]+/) === false) {
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
    if (!req.body.username || req.body.username.trim() === '') {
      return res.status(400)
        .json({
          message: 'Username is required'
        });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .json({
          message: 'Password is required'
        });
    }
    next();
  }
}

export default ValidateUser;
