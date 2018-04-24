import express from 'express';

<<<<<<< HEAD
=======
import { getMeals } from '../dummyController/mealController'

>>>>>>> Setup API endpoint to get all the meals with tests
const router = express.Router();

router.get('/', getMeals);

module.exports = router;
