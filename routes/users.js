const router = require('express').Router();

const { getUserProfile } = require('../controllers/users');

router.get('/me', getUserProfile);

module.exports = router;
