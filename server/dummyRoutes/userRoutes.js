import express from 'express';

import { userSignupPost } from '../dummyController/userController';

const router = express.Router();

router.post('/signup', userSignupPost);

module.exports = router;
