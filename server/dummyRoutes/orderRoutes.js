import express from 'express';

import Orders from '../dummyController/orderController';

const router = express.Router();

router.post('/', Orders.addOrders);
router.put('/:orderId', Orders.updateOrder);

module.exports = router;
