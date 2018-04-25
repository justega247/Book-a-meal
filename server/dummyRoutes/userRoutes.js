import express from 'express';

import Users from '../dummyController/userController';

const router = express.Router();

router.post('/signup', Users.userSignupPost);

module.exports = router;
