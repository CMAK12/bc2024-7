const express = require('express');
const controller = require('../controllers/device');

const router = express.Router();

router.post('/register', controller.register);
router.get('/devices', controller.list);
router.post('/take', controller.take);
router.get('/devices/:serial_number', controller.info);

module.exports = router;
