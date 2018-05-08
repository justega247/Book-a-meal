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
        }
        return res
          .send('Authentication failed, you need to login or register');
      }
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
          res.status(401).send(e);
        });
    });
  } else {
    res.status(401).send();
  }
};

const findByCredentials = (req, res, next) => {
  const { userName, password } = req.body;

  User.findOne({
    where: {
      userName
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404)
          .send('No user found with that username.');
      } else if (compareSync(password, user.password)) {
        req.user = user;
        next();
      } else {
        return res.status(400).send('Invalid password');
      }
    })
    .catch(e => res.status(400).send(e));
};

module.exports = {
  authenticate,
  findByCredentials,
};
