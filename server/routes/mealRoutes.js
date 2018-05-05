import express from 'express';

import Meals from '../controller/mealController';
import ValidateMeal from '../middleware/validateMeal';

const router = express.Router();

router.get('/', Meals.retrieveMeals);
router.post('/', ValidateMeal.mealDataValidation, Meals.addMeal);
router.put('/:mealId', ValidateMeal.mealUpdateValidation, Meals.updateMeal);
router.delete('/:mealId', Meals.removeMeal);

module.exports = router;
