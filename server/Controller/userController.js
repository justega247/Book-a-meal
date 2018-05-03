import bcrypt from 'bcrypt';
import users from '../seedData/Users';

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
    for (let i = 0; i < users.length; i += 1) {
      if (req.body.username.trim() === users[i].username) {
        return res.status(400)
          .send('Your username has been taken');
      } else if (req.body.email.trim() === users[i].email) {
        return res.status(400)
          .send('Your email is already in use');
      }
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
