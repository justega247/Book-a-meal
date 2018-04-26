import express from 'express';

import Orders from '../dummyController/orderController';

const router = express.Router();

router.post('/', Orders.postOrders);

module.exports = router;
