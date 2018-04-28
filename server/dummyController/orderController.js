import orders from '../seedData/dummyOrders';
import meals from '../seedData/dummyMeal';



/**
 * @class Orders
 */
class Orders {
  /**
 * @return {Object} updated order
 * @param {param} req
 * @param {param} res
 */
  static putOrder(req,res) {
    //console.log(req.params.orderId);
    let order;
    let Id;
    let deleteOrder;
    let addOrder;

    Id = parseInt(req.params.orderId, 10);
    deleteOrder = req.body.deleteOrder;
    addOrder = req.body.addOrder;

    for(let i = 0; i < orders.length; i += 1) {
      if(orders[i].orderId === Id) {
        order = orders[i]

        for(let j = 0; j < deleteOrder.length; j += 1) {
          for(let k = 0; k < order.meals.length; k += 1) {
            if(deleteOrder[j] === order.meals[k].mealId) {
              order.meals.splice(k,1);
            }
          }
        }

        for(let x = 0; x < addOrder.length; x += 1) {
          for(let y = 0; y < meals.length; y += 1) {
            if(addOrder[x] === meals[y].mealId) {
              order.meals.push(meals[y]);
            }
          }
        }

        return res.status(200).json({
          message: 'Your order has been modified',
          yourNewOrder: order
        })

      }
    }
    return res.status(400).json({
      message: 'Your orderId is invalid'
    })
  };
};

export default Orders;
