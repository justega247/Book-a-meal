import express from 'express';

import Users from '../controllers/userController';
import ValidateUser from '../middleware/validateUser';
import { findByCredentials } from '../middleware/authenticate';

const router = express.Router();

router.post('/auth/signup', ValidateUser.signUpDataValidation, Users.addUser);
router.post('/auth/login', findByCredentials, Users.signinUser);

module.exports = router;
