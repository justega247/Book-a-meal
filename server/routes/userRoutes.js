import express from 'express';

import Users from '../controllers/userController';
import ValidateUser from '../middleware/validateUser';

const router = express.Router();

router.post('/signup', ValidateUser.signUpDataValidation, Users.addUser);

module.exports = router;
