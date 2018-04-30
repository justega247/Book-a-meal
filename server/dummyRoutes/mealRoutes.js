import express from 'express';

import Meals from '../dummyController/mealController';

const router = express.Router();

router.post('/', Meals.addMeal);

module.exports = router;
