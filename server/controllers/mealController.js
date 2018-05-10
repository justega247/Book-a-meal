import { pick } from 'lodash';
import { Meal } from '../models';

/**
 * @class Meals
 */
class Meals {
/**
 * @return {Object} mealsAvailable
 * @param {param} req
 * @param {param} res
 */
  static retrieveMeals(req, res) {
    return Meal.all().then((meals) => {
      if (meals.length === 0) {
        return res.status(200).json({
          status: false,
          message: 'No meals found'
        });
      }
      res.status(200).json({
        status: true,
        message: 'Available meals',
        meals
      });
    });
  }

  /**
 * @return {Object} added meal
 * @param {param} req
 * @param {param} res
 */
  static addMeal(req, res) {
    Meal.findOne({
      where: {
        name: req.body.name
      }
    }).then((meal) => {
      if (meal) {
        res.status(409)
          .json({
            status: false,
            message: 'Sorry, that meal name already exists'
          });
        return;
      }
      return Meal.create({
        name: req.body.name.trim(),
        price: req.body.price,
        imageUrl: req.body.imageUrl.trim(),
        category: req.body.category.trim(),
        userId: req.user.id
      }).then((createdMeal) => {
        const { name, imageUrl, price } = createdMeal;
        res.status(201).json({
          status: true,
          message: 'A new meal was just created',
          meal: {
            name,
            imageUrl,
            price
          }
        });
      }).catch(() => res.status(500).send({
        status: false,
        message: 'Sorry, your request could not be processed'
      }));
    });
  }

  /**
 * @return {Object} updated meal
 * @param {param} req
 * @param {param} res
 */
  static updateMeal(req, res) {
    Meal.findOne({
      where: {
        name: req.body.name
      }
    }).then((meal) => {
      if (meal) {
        res.status(409)
          .json({
            status: false,
            message: 'Sorry, a meal with that name already exists'
          });
        return;
      }
      const mealId = parseInt(req.params.mealId, 10);

      return Meal.findOne({
        where: {
          id: mealId
        }
      })
        .then((mealFound) => {
          if (!mealFound) {
            return res.status(200).json({
              status: false,
              message: 'No meal with that Id was found'
            });
          }

          return mealFound.update({
            name: req.body.name || meal.name,
            category: req.body.category || meal.category,
            price: req.body.price || meal.price,
            imageUrl: req.body.imageUrl || meal.imageUrl
          })
            .then((updatedMeal) => {
              const { name, imageUrl, price, category } = updatedMeal;
              res.status(200).json({
                status: true,
                message: 'Meal updated successfully',
                meal: {
                  name,
                  imageUrl,
                  price,
                  category
                }
              });
            })
            .catch(() => res.status(500).send({
              status: false,
              message: 'Sorry, your request could not be processed'
            }));
        });
    });
  }

  /**
 * @return {Object} leftover meals
 * @param {param} req
 * @param {param} res
 */
  static removeMeal(req, res) {
    const foodId = parseInt(req.params.mealId, 10);
    Meal.findOne({
      where: {
        id: foodId
      }
    })
      .then((foundMeal) => {
        if (!foundMeal) {
          return res.status(200).json({
            status: false,
            message: 'Sorry,there is no meal with that mealId'
          });
        }
        return foundMeal
          .destroy()
          .then(() => res.status(204).send({
            status: true,
            message: 'A meal was just deleted'
          }))
          .catch(() => res.status(500).send({
            status: false,
            message: 'Sorry, your request could not be processed'
          }));
      })
      .catch(() => res.status(500).send({
        status: false,
        message: 'Sorry, your request could not be processed'
      }));
  }
}

export default Meals;
