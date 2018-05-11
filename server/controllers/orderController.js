// import { Order, Meal, Menu } from '../models';

// /**
//  * @class Orders
//  */
// class Orders {
//   /**
//  * @return {Object} orders
//  * @param {param} req
//  * @param {param} res
//  */
//   static addOrders(req, res) {
//     const mealId = req.body.meal;
//     const menuId = req.headers.menuId;
//     const newMeal = [];

//     return Menu.find({
//       where: {
//         id: menuId
//       }
//     }).then((menuFound) => {
//       // if(!menuFound) {
//       //   return res.status(400).json({
//       //     status: false,
//       //     message: 'Sorry,there is no menu with that id'
//       //   })

//       // }
//       const mealArray = 'menuFound.mealsFound';
//       for (let i = 0; i < mealArray.length; i += 1) {
//         if (mealArray[i].id === mealId) {
//           newMeal.push(mealId);
//         }
//       }
//       return Order.create({
//         title: req.body.title,
//         quantity: req.body.quantity,
//         userId: req.user.id
//       }).then((newOrder) => {
//         const time = new Date(Date.now());
//         if (time.getHours() > 19) {
//           return res.status(200).json({
//             status: false,
//             message: "Sorry, you can't make an order at this time."
//           });
//         }
//         newOrder.setMeals(newMeal);
//         return res.status(201).json(newOrder);
//       });
//       // .catch(() => res.status(500).json({
//       //   status: false,
//       //   message: 'Sorry, your request could not be processed'
//       // }));
//     });
//   }
// }

// export default Orders;
