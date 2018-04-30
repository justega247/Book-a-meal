import express from 'express';

import Meals from '../dummyController/mealController';

const router = express.Router();

router.put('/:mealId', Meals.updateMeal);

module.exports = router;
