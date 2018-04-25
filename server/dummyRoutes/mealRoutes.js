
import express from 'express';

import Meals from '../dummyController/mealController';

const router = express.Router();

router.put('/:mealId', Meals.putMeal);

module.exports = router;
