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
      let total;
      let cost = [];

      for(let i = 0; i < orders.length; i += 1) {
        for(let j = 0; j < orders[i].meals.length; j += 1) {
          cost.push(orders[i].meals[j].price);
        }
      }

      const reducer = (acc, currentValue) => acc + currentValue;
      total = cost.reduce(reducer);
      console.log(total);

      const ordersAvailable = orders.map(order => Object.assign({}, order));

      return res.status(200).json({
        message: 'Here are the orders for the day',
        total: total,
        orders: ordersAvailable
      });
    }
    return res.status(500);
  }
}

export default Orders
