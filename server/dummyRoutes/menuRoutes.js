import express from 'express';

import Menu from '../dummyController/menuController';

const router = express.Router();

router.post('/', Menu.addMenu);
router.get('/', Menu.availableMenu);
module.exports = router;
