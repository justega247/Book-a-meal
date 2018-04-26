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
  static postOrders(req, res) {
    const mealOrder = req.body.meals;

    if (mealOrder.length === 0) {
      return res.status(400).json({
        message: 'You have not specified any meal to order'
      });
    }
    orders.push({
      orderId: orders.length + 1,
      meals: mealOrder
    });
    return res.status(200).json({
      message: 'Here is what you ordered',
      yourOrder: orders[orders.length - 1]
    });
  }
}

export default Orders;
