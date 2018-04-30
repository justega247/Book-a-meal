import orders from '../seedData/dummyOrders';

/**
 * @class Orders
 */
class Orders {
  /**
 * @return {Object} Available orders
 * @param {param} req
 * @param {param} res
 */
  static availableOrders(req, res) {
    if (orders.length === 0) {
      return res.status(200).json({
        message: 'Sorry,no orders made yet',
        orders: []
      });
    } else if (orders.length > 0) {
      const ordersAvailable = orders.map(order => Object.assign({}, order));

      const p1 = ordersAvailable.map(x => x.meals);

      return res.status(200).json({
        message: 'Success',
        orders: ordersAvailable
      });
    }
    return res.status(500);
  }
}

export default Orders
