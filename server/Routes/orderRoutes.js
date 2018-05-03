import express from 'express';

import Orders from '../controller/orderController';

const router = express.Router();

router.post('/', Orders.addOrders);
router.put('/:orderId', Orders.updateOrder);
router.get('/', Orders.allOrders);

module.exports = router;
