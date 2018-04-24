import express from 'express';

import { postMeal } from '../dummyController/mealController'

const router = express.Router();

router.post('/', postMeal);

module.exports = router;
