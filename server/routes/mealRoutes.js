import express from 'express';

import Meals from '../controller/mealController';
import ValidateMeal from '../middleware/validateMeal';

const router = express.Router();

router.get('/', Meals.retrieveMeals);
router.post('/', ValidateMeal.mealData, Meals.addMeal);
router.put('/:mealId', ValidateMeal.mealUpdate, Meals.updateMeal);
router.delete('/:mealId', Meals.removeMeal);

module.exports = router;
