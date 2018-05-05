import bcrypt from 'bcrypt';
import users from '../seedData/users';

const saltRounds = 10;

/**
 * @class Users
 */
class Users {
/**
 * @return {Object} new user
 * @param {param} req
 * @param {param} res
 */
  static addUser(req, res) {
    let user;

    user = users.find(one => req.body.username.trim() === one.username);
    if (user) {
      return res.status(409)
        .json({
          message: 'Sorry, that username already exists'
        });
    }

    user = users.find(one => req.body.email.trim() === one.email);
    if (user) {
      return res.status(409)
        .json({
          message: 'Sorry, that email already exists'
        });
    }

    users.push({
      fullname: req.body.fullname.trim(),
      username: req.body.username.trim(),
      password: bcrypt.hashSync(req.body.password, saltRounds),
      email: req.body.email.trim()
    });
    return res.status(201)
      .send({
        message: 'New user successfully created',
        username: users[users.length - 1].username,
        userId: users.length
      });
  }
}

export default Users;
