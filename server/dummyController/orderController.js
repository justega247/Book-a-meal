import orders from '../seedData/dummyOrders';

/**
 * @class Orders
 */
class Orders {
  /**
 * @return {Object} orders
 * @param {param} req
 * @param {param} res
 */
  static addOrders(req, res) {
    // req.body.meals is an array containing the meals you want to add.
    const mealOrder = req.body.meals;

    // check to make sure at least one meal has been ordered.
    if (mealOrder.length === 0) {
      return res.status(400).json({
        message: 'You have not specified any meal to order'
      });
    }
    orders.push({
      orderId: orders.length + 1,
      meals: mealOrder
    });
    return res.status(201).json({
      message: 'Success',
      yourOrder: orders[orders.length - 1]
    });
  }
}

export default Orders;
