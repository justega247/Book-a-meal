import express from 'express';

import Orders from '../controllers/orderController';
import { authenticateme } from '../middleware/authenticate';

const router = express.Router();

router.use('*', authenticateme);

// router.post('/', Orders.addOrders);
// // router.put('/:orderId', Orders.updateOrder);
// // router.get('/', Orders.allOrders);

module.exports = router;
