import express from 'express';

import Menu from '../dummyController/menuController';

const router = express.Router();

router.post('/', Menu.addMenu);

module.exports = router;
