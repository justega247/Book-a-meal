import { verify } from 'jsonwebtoken';
import { compareSync } from 'bcrypt-nodejs';

import { User } from '../models';

const { SECRET } = process.env;

const authenticated = (req, res, next) => {
  const token = req.headers['x-auth'];

  if (token) {
    verify(token, SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .json({
              status: false,
              message: 'Current session expired,please login to continue'
            });
        } else if (err.name === 'JsonWebTokenError') {
          return res
            .status(401)
            .json({
              status: false,
              message: 'Sorry, you are not authorized to continue'
            });
        }
        return res.status(401)
          .json({
            status: false,
            message: 'Authentication failed, you need to login or register'
          });
      }
      req.decoded = decoded;
      User.findOne({
        where: {
          id: decoded.id
        }
      })
        .then((user) => {
          if (!user) {
            res.status(200).json({
              status: false,
              message: 'No user found'
            });
            return;
          }
          req.user = user;
          const { status } = req.user;
          if (status !== 'admin') {
            return res.status(403).json({
              status: false,
              message: 'Sorry, you are not authorized to use this endpoint'
            });
          }
          next();
        })
        .catch(() => res.status(500).json({
          status: false,
          message: 'Sorry, your request could not be processed'
        }));
    });
  } else {
    res.status(401).json({
      status: false,
      message: 'Authentication failed'
    });
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
          .json({
            status: false,
            message: 'No user found with that username.'
          });
      } else if (compareSync(password, user.password)) {
        req.user = user;
        next();
      }
    })
    .catch(() => res.status(500).json({
      status: false,
      message: 'Sorry, your request could not be processed'
    }));
};

const authenticateme = (req, res, next) => {
  const token = req.headers['x-auth'];

  if (token) {
    verify(token, SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .json({
              status: false,
              message: 'Current session expired,please login to continue'
            });
        } else if (err.name === 'JsonWebTokenError') {
          return res
            .status(401)
            .json({
              status: false,
              message: 'Sorry, you are not authorized to continue'
            });
        }
        return res.status(401)
          .json({
            status: false,
            message: 'Authentication failed, you need to login or register'
          });
      }
      req.decoded = decoded;
      User.findOne({
        where: {
          id: decoded.id
        }
      })
        .then((user) => {
          if (!user) {
            res.status(200).json({
              status: false,
              message: 'Sorry, no user with a matching id was found'
            });
            return;
          }
          req.user = user;
          next();
        })
        .catch(() => res.status(500).json({
          status: false,
          message: 'Sorry, your request could not be processed'
        }));
    });
  } else {
    res.status(401).json({
      status: false,
      message: 'Your authentication has failed'
    });
  }
};

module.exports = {
  authenticated,
  authenticateme,
  findByCredentials,
};
