import express from 'express';

import Meals from '../dummyController/mealController';

const router = express.Router();

router.delete('/:mealId', Meals.deleteMeal);

module.exports = router;
