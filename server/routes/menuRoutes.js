import express from 'express';

import TheMenu from '../controllers/menuController';
import { authenticated } from '../middleware/authenticate';

const router = express.Router();

router.use('*', authenticated);

router.post('/', TheMenu.addMenu);
// router.get('/', Menu.retrieveMenu);
module.exports = router;
