import orders from '../seedData/orders';
import menu from '../seedData/menu';

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
    // req.body.meals is an array containing the mealIds you want to add.
    const mealOrder = req.body.meals;
    const menuArray = [];

    if (menu.length === 0) {
      return res.status(400)
        .json({
          message: 'Sorry, no menu has been set'
        });
    }

    // check to make sure at least one meal has been ordered.
    if (mealOrder.length === 0) {
      return res.status(400).json({
        message: 'You have not specified any meal to order'
      });
    }

    mealOrder.forEach((one) => {
      menuArray.push(menu.find(meal => parseInt(one, 10) === meal.mealId));
    });

    if (orders.length === 0) {
      orders.push({
        orderId: 1,
        meals: menuArray
      });
    } else {
      orders.push({
        orderId: orders[orders.length - 1].orderId + 1,
        meals: menuArray
      });
    }

    return res.status(201).json({
      message: 'Success',
      yourOrder: orders[orders.length - 1]
    });
  }

  /**
 * @return {Object} updated order
 * @param {param} req
 * @param {param} res
 */
  static updateOrder(req, res) {
    let order;

    const Id = parseInt(req.params.orderId, 10);

    // deleteOrder is an array for entering the mealId(s) of meals to remove.
    // addOrder is an array for entering the mealId(s) of meals to add.
    const { deleteOrder, addOrder } = req.body;

    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].orderId === Id) {
        order = orders[i];

        // Delete meals that have matching Id's from the orders
        for (let j = 0; j < deleteOrder.length; j += 1) {
          for (let k = 0; k < order.meals.length; k += 1) {
            if (deleteOrder[j] === order.meals[k].mealId) {
              order.meals.splice(k, 1);
            }
          }
        }

        // Add meals that have matching Id's to the orders
        for (let x = 0; x < addOrder.length; x += 1) {
          for (let y = 0; y < menu.length; y += 1) {
            if (addOrder[x] === menu[y].mealId) {
              order.meals.push(menu[y]);
            }
          }
        }

        return res.status(200).json({
          message: 'Your order has been modified',
          yourNewOrder: order
        });
      }
    }
    return res.status(400).json({
      message: 'Your orderId is invalid'
    });
  }

  /**
 * @return {Object} all orders
 * @param {param} req
 * @param {param} res
 */
  static allOrders(req, res) {
    // Check that orders have been made
    if (orders.length === 0) {
      return res.status(200).json({
        message: 'Sorry, no orders made yet',
        orders: []
      });
    } else if (orders.length > 0) {
      const cost = [];

      // Check for the total price of the orders made if any.
      for (let i = 0; i < orders.length; i += 1) {
        for (let j = 0; j < orders[i].meals.length; j += 1) {
          cost.push(orders[i].meals[j].price);
        }
      }
      const reducer = (acc, currentValue) => acc + currentValue;
      const total = cost.reduce(reducer);

      const ordersAvailable = orders.map(order => Object.assign({}, order));

      return res.status(200).json({
        message: 'Here are the orders for the day',
        total,
        orders: ordersAvailable
      });
    }
  }
}

export default Orders;
