import express from 'express';

import TheMenu from '../controllers/menuController';
import { authenticated, authenticateme } from '../middleware/authenticate';

const router = express.Router();

router.post('/', authenticated, TheMenu.addMenu);
router.get('/', authenticateme, TheMenu.retrieveMenu);

module.exports = router;
