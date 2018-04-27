import express from 'express';

import Orders from '../dummyController/orderController'

const router = express.Router();

router.put('/:orderId', Orders.putOrder);

module.exports = router;
