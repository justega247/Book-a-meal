import express from 'express';

import Meals from '../controllers/mealController';
import ValidateMeal from '../middleware/validateMeal';
import { authenticated } from '../middleware/authenticate';

const router = express.Router();

router.get('/', authenticated, Meals.retrieveMeals);
router.post('/', authenticated, ValidateMeal.mealDataValidation, Meals.addMeal);
router.put('/:mealId', authenticated, ValidateMeal.mealUpdateValidation, Meals.updateMeal);
router.delete('/:mealId', authenticated, Meals.removeMeal);

module.exports = router;
