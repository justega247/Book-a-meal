import { sign } from 'jsonwebtoken';

import { User } from '../models';

const { SECRET, TOKEN_EXPIRATION_TIME } = process.env;

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
    User.findOne({
      where: {
        $or: [
          { userName: req.body.userName.trim() },
          { email: req.body.email.trim() }
        ]
      }
    })
      .then((user) => {
        if (user) {
          const error = {};
          if (user.userName === req.body.userName
          && user.email === req.body.email) {
            return res.status(409).json({
              message:
                'Sorry, the username and email you have set, already exists'
            });
          }
          if (user.userName === req.body.userName) {
            error.theError = 'userName';
          } else {
            error.theError = 'email';
          }
          if (error.theError === 'userName') {
            return res.status(409).json({
              message: 'Sorry, that username already exists'
            });
          } else if (error.theError === 'email') {
            return res.status(409).json({
              message: 'Sorry, that email already exists'
            });
          }
          return;
        }
        return User.create({
          userName: req.body.userName.trim(),
          fullName: req.body.fullName.trim(),
          password: req.body.password,
          email: req.body.email.trim(),
          status: req.body.status.trim() || 'customer'
        }).then((createdUser) => {
          const token = sign(
            {
              id: createdUser.id
            },
            SECRET,
            {
              expiresIn: TOKEN_EXPIRATION_TIME
            }
          );
          const { id, userName, fullName, email } = createdUser;
          res.header('x-auth', token).status(201).send({
            id,
            userName,
            fullName,
            email
           });
        })
          .catch(() => res.status(500).send({
            message: 'Sorry,your request could not be processed'
          }));
      });
  }

  /**
 * @return {Object} registered user
 * @param {param} req
 * @param {param} res
 */
  static signinUser(req, res) {
    const { id, userName } = req.user;
    const token = sign(
      { id }, SECRET,
      { expiresIn: TOKEN_EXPIRATION_TIME }
    );
    res.header('x-auth', token).status(200).send({
      id,
      userName
    });
  }
}

export default Users;
