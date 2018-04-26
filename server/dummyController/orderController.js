import orders from '../seedData/dummyOrders';

/**
 * @class Orders
 */
class Orders {
  /**
 * @return {Object} get orders
 * @param {param} req
 * @param {param} res
 */
  static getOrders(req, res) {
    if (orders.length === 0) {
      return res.status(200).json({
        message: 'Oh! no orders made yet',
        orders: []
      });
    } else if (orders.length > 0) {
      const ordersAvailable = orders.map(order => Object.assign({}, order));
      return res.status(200).json({
        message: 'Here are the orders for the day',
        orders: ordersAvailable
      });
    }
    return res.status(500);
  }
}

export default Orders
