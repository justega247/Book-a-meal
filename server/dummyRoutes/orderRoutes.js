import express from 'express';

import Orders from '../dummyController/orderController'

const router = express.Router();

router.get('/', Orders.getOrders);

module.exports = router;
