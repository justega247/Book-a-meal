import express from 'express';

import Menu from '../dummyController/menuController';

const router = express.Router();

router.get('/', Menu.getMenu);

module.exports = router;
