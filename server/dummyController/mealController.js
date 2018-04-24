import meals from '../seedData/dummyMeal';

exports.getMeals = (req, res) => {
  if(meals.length === 0) {
    return res.status(200).send('Sorry no available meal');
  } else if(meals.length > 0) {
    const mealsAvailable = meals.map(meal => Object.assign({}, meal));
    return res.status(200).send(mealsAvailable);
  } else {
    return res.status(500);
  }
};
