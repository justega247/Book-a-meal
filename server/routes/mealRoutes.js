import express from 'express';

import Meals from '../controllers/mealController';
import ValidateMeal from '../middleware/validateMeal';
import { authenticated } from '../middleware/authenticate';

const router = express.Router();

router.use('*', authenticated);

router.get('/', Meals.retrieveMeals);
router.post('/', ValidateMeal.mealDataValidation, Meals.addMeal);
router.put('/:mealId', ValidateMeal.mealUpdateValidation, Meals.updateMeal);
router.delete('/:mealId', Meals.removeMeal);

module.exports = router;
