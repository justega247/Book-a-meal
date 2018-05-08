import { verify } from 'jsonwebtoken';
import { compareSync } from 'bcrypt-nodejs';

import { User } from '../models';

const SECRET = process.env.SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers['x-auth'];

  if (token) {
    verify(token, SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .send('Current session expired,please login to continue');
        } else if (err.name === 'JsonWebTokenError') {
          return res
            .status(401)
            .send('jwt malformed');
        } else {
          return res
            .send('Authentication failed, you need to login or register');
        }
      } else {
        req.decoded = decoded;
        User.findOne({
          where: {
            id: decoded.id
          }
        })
        .then((user) => {
          if (!user) {
            res.send('No user found');
            return;
          }
          req.user = user;
          next();
        })
        .catch((e) => {
          res.status(401).send();
        });
      }
    });
  } else {
    res.status(401).send();
  }
};

const findByCredentials = (req, res, next) => {
  let userName = req.body.userName;
  let password = req.body.password;

  User.findOne({
    where: {
      userName: userName
    }
  })
  .then((user) => {
    if(!user) {
      return res.status(404)
        .send('No user found with that username.');
    } else if (compareSync(password, user.password)) {
      req.user = user;
      next();
    } else {
      return res.status(400).send('Invalid password');
    }
  })
  .catch(e => res.status(400).send())
};

module.exports = {
  authenticate,
  findByCredentials,
};
