import express from 'express';

import Meals from '../dummyController/mealController';

const router = express.Router();

router.get('/', Meals.mealsAvailable);

module.exports = router;
