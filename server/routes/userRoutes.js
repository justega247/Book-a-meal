import express from 'express';

import Users from '../controller/userController';
import ValidateUser from '../middleware/validateUser';

const router = express.Router();

router.post('/signup', ValidateUser.signUp, Users.addUser);

module.exports = router;