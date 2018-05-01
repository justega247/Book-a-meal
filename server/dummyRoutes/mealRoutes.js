import express from 'express';

import Meals from '../dummyController/mealController';

const router = express.Router();

router.get('/', Meals.mealsAvailable);
router.post('/', Meals.addMeal);
router.put('/:mealId', Meals.updateMeal);

module.exports = router;
