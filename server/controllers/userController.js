import { pick } from 'lodash';
import { sign } from 'jsonwebtoken';
import { Op } from 'sequelize';

import { User } from '../models';
import { TOKEN_EXPIRATION_TIME } from '../constants/index';

const SECRET = process.env.SECRET;

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
        [Op.or]: [
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
        }).then((duser) => {
          const token = sign(
            {
              id: duser.id
            },
            SECRET,
            {
              expiresIn: TOKEN_EXPIRATION_TIME
            }
          );
          const newUser = pick(duser, [
            'id',
            'userName',
            'fullName',
            'email'
          ]);
          res.header('x-auth', token).status(201).send({ newUser });
        })
          .catch(e => res.status(500).send(e));
      });
  }

  /**
 * @return {Object} registered user
 * @param {param} req
 * @param {param} res
 */
  static signinUser(req, res) {
    const body = pick(req.user, ['userName', 'id']);
    const token = sign(
      { id: body.id }, SECRET,
      { expiresIn: TOKEN_EXPIRATION_TIME }
    );
    res.header('x-auth', token).status(200).send(body);
  }
}

export default Users;
