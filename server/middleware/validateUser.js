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
    const error = [];
    let {
      userName, fullName, email, password
    } = req.body;
    userName = userName.trim();
    fullName = fullName.trim();
    const re = /\s/g;
    const userNameStr = userName.replace(re, '');
    const fullNameStr = fullName.toLowerCase().replace(re, '');

    if (!validator.isEmail(email.trim())) {
      error.push({ email: 'Sorry, your email is invalid' });
    }

    if (!validator.isAlphanumeric(userNameStr)
      || userNameStr === ''
      || userNameStr.length < 3) {
      error.push({ userName: 'Sorry, your username is invalid' });
    }

    if (!password
        || password.trim() === ''
        || password.trim().length < 6) {
      error.push({ password: 'Sorry, your password is invalid' });
    }

    if (!fullNameStr || fullNameStr < 2 || /[^a-z]/i.test(fullNameStr)) {
      error.push({ fullName: 'Sorry, your fullName is invalid' });
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
   * validate user input on signIn
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static signInDataValidation(req, res, next) {
    const error = [];
    if (!req.body.userName || req.body.userName.trim() === '') {
      error.push({ userName: 'The userName you have entered is invalid' });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      error.push({ password: 'The password you have entered is invalid' });
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

export default ValidateUser;
